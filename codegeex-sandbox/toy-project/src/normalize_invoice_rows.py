from decimal import Decimal


def normalize_invoice_rows(rows):
    normalized = []

    for row in rows:
        amount = Decimal(row["amount"])
        currency = row.get("currency", "USD").upper()
        vendor = row["vendor"].strip()

        normalized.append(
            {
                "vendor": vendor,
                "amount": amount,
                "currency": currency,
                "month": row["date"][:7],
            }
        )

    return normalized

