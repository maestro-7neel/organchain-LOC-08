from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def compute_trust_score(data):
    score = 100
    reasons = []

    rank = data.get('recipient_rank', 1)
    if rank > 5:
        deduction = min((rank - 5) * 8, 35)
        score -= deduction
        reasons.append(f"Recipient ranked #{rank} on waiting list (-{deduction}pts)")

    secs = data.get('time_to_allocate_secs', 600)
    if secs < 180:
        score -= 25
        reasons.append(f"Allocated in {secs}s — suspiciously fast (-25pts)")

    dist = data.get('distance_km', 0)
    skipped = data.get('closer_recipient_skipped', False)
    if dist > 300 and skipped:
        score -= 20
        reasons.append(f"Closer recipient skipped, organ going {dist}km (-20pts)")

    if not data.get('blood_group_match', True):
        score -= 40
        reasons.append("Blood group incompatibility detected (-40pts)")

    urgency = data.get('urgency_score', 5)
    if urgency < 3 and rank > 2:
        score -= 15
        reasons.append(f"Low urgency recipient (score {urgency}) prioritized (-15pts)")

    if data.get('wait_time_days', 100) < 15:
        score -= 10
        reasons.append(f"Recipient only waited {data['wait_time_days']} days (-10pts)")

    final = max(score, 0)

    return {
        'score': final,
        'risk_level': 'HIGH' if final < 40 else 'MEDIUM' if final < 70 else 'LOW',
        'reasons': reasons,
        'recommendation': 'FLAG FOR REVIEW' if final < 60 else 'APPROVED',
        'engine': 'rule-based'
    }

@app.route('/score', methods=['POST'])
def score():
    data = request.json
    return jsonify(compute_trust_score(data))

@app.route('/health')
def health():
    return jsonify({'status': 'running', 'engine': 'rule-based'})

if __name__ == '__main__':
    app.run(port=5001, debug=True)