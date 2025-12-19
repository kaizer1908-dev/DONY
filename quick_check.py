import sys
print(f"Python version: {sys.version}")
print("Testing imports...")

try:
    import pandas as pd
    print("✓ pandas imported")
except ImportError as e:
    print(f"✗ pandas not available: {e}")

try:
    import matplotlib
    print("✓ matplotlib imported")
except ImportError as e:
    print(f"✗ matplotlib not available: {e}")

try:
    import seaborn
    print("✓ seaborn imported")
except ImportError as e:
    print(f"✗ seaborn not available: {e}")

try:
    import openpyxl
    print("✓ openpyxl imported")
except ImportError as e:
    print(f"✗ openpyxl not available: {e}")
