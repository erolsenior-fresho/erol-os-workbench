const form = document.querySelector('#chat');
const input = document.querySelector('#prompt');
const messages = document.querySelector('#messages');
const status = document.querySelector('#status');
const send = document.querySelector('#send');
const clear = document.querySelector('#clear');
let history = [];
const append = (text, role) => {
  const p = document.createElement('p');
  p.className = role;
  p.textContent = text;
  messages.append(p);
  p.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
};
clear.addEventListener('click', () => { history = []; messages.replaceChildren(); status.textContent = 'Yeni sohbet hazır.'; });
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text || send.disabled) return;
  const proposed = [...history, { role: 'user', content: text }].slice(-12);
  append(text, 'user');
  send.disabled = clear.disabled = true;
  status.textContent = 'Hermes yanıt hazırlıyor…';
  try {
    const response = await fetch('./api/hermes/chat', { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Erol-Chat': '1' }, body: JSON.stringify({ messages: proposed }) });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Bağlantı kurulamadı.');
    append(data.reply, 'assistant');
    history = [...proposed, { role: 'assistant', content: data.reply }];
    input.value = '';
    status.textContent = 'Hazır. Sohbet yalnızca bu açık sayfada tutulur.';
  } catch (error) { status.textContent = error.message + ' Mac üzerindeki Erol OS yerel sunucusunun açık olduğundan emin ol.'; }
  finally { send.disabled = clear.disabled = false; input.focus(); }
});
