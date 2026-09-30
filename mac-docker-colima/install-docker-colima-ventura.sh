#!/usr/bin/env bash
# Homebrew olmadan Intel Mac (macOS 13 Ventura) üzerine Docker kurulumu:
#   Lima + Colima  -> GitHub release binary'leri
#   docker CLI     -> download.docker.com static binary
# Hepsi /usr/local altına kurulur. Lima'nın son sürümü çalışmazsa bir önceki sürüme iner.
#
# Kullanım:  bash install-docker-colima-ventura.sh
set -euo pipefail

PREFIX=/usr/local
ARCH=x86_64
TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT

log()  { printf '\n\033[1;34m==> %s\033[0m\n' "$*"; }
warn() { printf '\033[1;33m!! %s\033[0m\n' "$*"; }
die()  { printf '\033[1;31mXX %s\033[0m\n' "$*"; exit 1; }

# --- Ön kontroller -----------------------------------------------------------
[[ "$(uname -s)" == Darwin ]] || die "Bu script sadece macOS için."
[[ "$(uname -m)" == x86_64 ]] || die "Bu script Intel (x86_64) Mac için. Bulunan: $(uname -m)"
OS_VER=$(sw_vers -productVersion)
log "macOS $OS_VER (Intel) tespit edildi"
[[ "${OS_VER%%.*}" -ge 13 ]] || die "--vm-type vz için macOS 13+ gerekli."

sudo -v   # şifreyi baştan bir kez sor
sudo mkdir -p "$PREFIX/bin" "$PREFIX/share"

# GitHub'dan stable (prerelease olmayan) release tag'lerini, yeniden eskiye listeler
stable_tags() {
  curl -fsSL "https://api.github.com/repos/$1/releases?per_page=15" \
    | awk -F'"' '/"tag_name":/{t=$4} /"prerelease": *false/{if(t!="")print t; t=""} /"prerelease": *true/{t=""}'
}

# --- 1) docker CLI -----------------------------------------------------------
log "docker CLI (static) kuruluyor"
DOCKER_TGZ=$(curl -fsSL "https://download.docker.com/mac/static/stable/$ARCH/" \
  | grep -oE 'docker-[0-9]+\.[0-9]+\.[0-9]+\.tgz' | sort -uV | tail -1)
[[ -n "$DOCKER_TGZ" ]] || die "docker static binary bulunamadı"
curl -fL# "https://download.docker.com/mac/static/stable/$ARCH/$DOCKER_TGZ" -o "$TMP/docker.tgz"
tar -xzf "$TMP/docker.tgz" -C "$TMP"
sudo install -m 0755 "$TMP/docker/docker" "$PREFIX/bin/docker"
docker --version

# --- 2) Colima ---------------------------------------------------------------
log "Colima kuruluyor"
COLIMA_TAG=$(stable_tags abiosoft/colima | head -1)
[[ -n "$COLIMA_TAG" ]] || die "Colima sürümü alınamadı (GitHub API rate limit olabilir)"
curl -fL# "https://github.com/abiosoft/colima/releases/download/$COLIMA_TAG/colima-Darwin-$ARCH" -o "$TMP/colima"
sudo install -m 0755 "$TMP/colima" "$PREFIX/bin/colima"
colima version

# --- 3) Lima (son sürüm, olmazsa bir önceki) ----------------------------------
install_lima() {
  local tag=$1 ver=${1#v}
  log "Lima $tag kuruluyor"
  curl -fL# "https://github.com/lima-vm/lima/releases/download/$tag/lima-$ver-Darwin-$ARCH.tar.gz" -o "$TMP/lima.tgz"
  # Eski kurulum kalıntılarını temizle (farklı sürümün guest agent'ları karışmasın)
  sudo rm -rf "$PREFIX/share/lima" "$PREFIX/bin/limactl" "$PREFIX/bin/lima" "$PREFIX/bin/nerdctl.lima" \
              "$PREFIX/bin/docker.lima" "$PREFIX/bin/podman.lima" "$PREFIX/bin/kubectl.lima" "$PREFIX/bin/apptainer.lima"
  sudo tar -xzf "$TMP/lima.tgz" -C "$PREFIX"
  limactl --version
}

start_colima() {
  log "colima start --vm-type vz --cpu 2 --memory 4"
  colima start --vm-type vz --cpu 2 --memory 4
}

LIMA_TAGS=()
while IFS= read -r t; do LIMA_TAGS+=("$t"); done < <(stable_tags lima-vm/lima | head -2)
[[ ${#LIMA_TAGS[@]} -ge 1 ]] || die "Lima sürümleri alınamadı (GitHub API rate limit olabilir)"

OK=0
for tag in "${LIMA_TAGS[@]}"; do
  if install_lima "$tag" && start_colima; then
    OK=1; LIMA_OK_TAG=$tag; break
  fi
  warn "Lima $tag Ventura'da çalışmadı, bir önceki sürüme iniliyor..."
  colima stop -f >/dev/null 2>&1 || true
  colima delete -f >/dev/null 2>&1 || true
done
[[ $OK -eq 1 ]] || die "Denenen Lima sürümleri (${LIMA_TAGS[*]}) ile colima başlatılamadı. Log: ~/.colima/_lima/colima/ha.stderr.log"

# --- 4) Doğrulama ------------------------------------------------------------
log "Doğrulama: docker run --rm hello-world"
docker context use colima >/dev/null 2>&1 || true
docker run --rm hello-world

log "TAMAM"
echo "  docker : $(docker --version)"
echo "  colima : $(colima version | head -1)"
echo "  lima   : $(limactl --version)  (kullanılan tag: $LIMA_OK_TAG)"
