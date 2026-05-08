# TESTS

All tests live in `backend/api/tests.py` and run without a Django database (pure Python unittest).

## How to run

```bash
cd backend
python api/tests.py
```

Expected output:
```
Ran 18 tests in 0.001s
OK
```

Also runs on every push to `main` via GitHub Actions (`.github/workflows/ci.yml`).

---

## Test inventory

### TestCursorAudit

| File | Test | Covers |
|---|---|---|
| `api/tests.py` | `test_business_2_seats_flags_downgrade` | Cursor Business ≤2 seats → recommend Pro; verifies saving = $40 |
| `api/tests.py` | `test_business_10_seats_no_flag` | Cursor Business 10 seats → no finding (appropriate tier) |
| `api/tests.py` | `test_enterprise_3_seats_flags_downgrade` | Cursor Enterprise ≤5 seats → recommend Business; verifies saving = $180 |
| `api/tests.py` | `test_pro_plan_no_flag` | Cursor Pro at any seat count → no flag |

### TestCopilotAudit

| File | Test | Covers |
|---|---|---|
| `api/tests.py` | `test_enterprise_small_team_flags` | Copilot Enterprise ≤10 seats → recommend Business |
| `api/tests.py` | `test_individual_3seats_coding_suggests_cursor` | Copilot Individual 3+ seats for coding → suggest Cursor |
| `api/tests.py` | `test_individual_writing_no_cursor_suggestion` | Copilot for writing → does NOT suggest Cursor (wrong use case) |

### TestClaudeAudit

| File | Test | Covers |
|---|---|---|
| `api/tests.py` | `test_team_plan_2_seats_flags` | Claude Team ≤2 seats → recommend individual Pro; verifies saving = $20 |
| `api/tests.py` | `test_team_plan_6_seats_no_flag` | Claude Team 6 seats → no downgrade flag |
| `api/tests.py` | `test_max_plan_multi_user_flags` | Claude Max for multi-person team → flag for Pro evaluation |

### TestApiAudit

| File | Test | Covers |
|---|---|---|
| `api/tests.py` | `test_high_api_spend_flags_usage_audit` | API spend >$500 → usage audit finding, saving = 25% |
| `api/tests.py` | `test_medium_api_spend_flags_caching` | API spend $200–$500 → prompt caching recommendation |
| `api/tests.py` | `test_low_api_spend_no_flag` | API spend <$200 → no finding |

### TestSavingsCalculation

| File | Test | Covers |
|---|---|---|
| `api/tests.py` | `test_total_savings_sum_correctly` | Multi-tool savings sum correctly end-to-end |
| `api/tests.py` | `test_no_negative_savings` | Savings values are never negative (clamping) |
| `api/tests.py` | `test_zero_spend_no_crash` | Zero monthly spend doesn't raise exceptions |
| `api/tests.py` | `test_api_spend_25_percent_saving` | High API saving is exactly 25% |
| `api/tests.py` | `test_caching_saving_is_15_percent` | Medium API saving is exactly 15% |
