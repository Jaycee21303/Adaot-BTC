from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import config

app = Flask(__name__)
CORS(app)

@app.route("/api/new-address", methods=["POST"])
def new_address():
    headers = {"X-Api-Key": config.LNBITS_ADMIN_KEY}
    url = f"{config.LNBITS_API_URL}/api/v1/wallet"
    r = requests.get(url, headers=headers)
    if r.status_code != 200:
        return jsonify({"error": "Failed to generate address"}), 400
    data = r.json()
    return jsonify({"address": data.get("address")})

@app.route("/api/new-invoice", methods=["POST"])
def new_invoice():
    body = request.json
    amount = body.get("amount", 0)
    memo = body.get("memo", "AdaptBTC Invoice")
    headers = {"X-Api-Key": config.LNBITS_INVOICE_KEY}
    payload = {"out": False, "amount": amount, "memo": memo}
    url = f"{config.LNBITS_API_URL}/api/v1/payments"
    r = requests.post(url, json=payload, headers=headers)
    if r.status_code != 201:
        return jsonify({"error": "Could not create invoice"}), 400
    data = r.json()
    return jsonify({
        "payment_hash": data.get("payment_hash"),
        "payment_request": data.get("payment_request")
    })

@app.route("/api/invoice-status/<payment_hash>", methods=["GET"])
def invoice_status(payment_hash):
    headers = {"X-Api-Key": config.LNBITS_INVOICE_KEY}
    url = f"{config.LNBITS_API_URL}/api/v1/payments/{payment_hash}"
    r = requests.get(url, headers=headers)
    if r.status_code != 200:
        return jsonify({"error": "Failed to check invoice"}), 400
    data = r.json()
    return jsonify({"paid": data.get("paid")})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)
