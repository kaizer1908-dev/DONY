import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import matplotlib.ticker as ticker
import numpy as np
import sys
import io

# Fix encoding for Windows console
if sys.platform == 'win32':
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')

# 1. 데이터 로드
# Excel 파일 직접 로드
file_path = '데이터(AFTER DAWN).xlsx - Sheet1.csv.xlsx'

try:
    # Excel 파일 읽기 (헤더 없이)
    df_raw = pd.read_excel(file_path, header=None)
    print("✓ 데이터 로드 성공")
    print(f"Shape: {df_raw.shape}")
except FileNotFoundError:
    print("❌ 파일을 찾을 수 없습니다. 경로를 확인해주세요.")
    df_raw = pd.DataFrame()
except Exception as e:
    print(f"❌ 오류 발생: {e}")
    df_raw = pd.DataFrame()

if not df_raw.empty:
    # 데이터 구조 확인
    print("\n=== 원본 데이터 미리보기 ===")
    print(df_raw.head(5))
    print(f"\n컬럼 수: {len(df_raw.columns)}")

    # 2. 데이터 전처리
    # 유효 데이터는 4행(index 4)부터 시작 (헤더 3줄)
    df = df_raw.iloc[4:].copy()
    df.reset_index(drop=True, inplace=True)

    # 실제 컬럼 수에 맞게 매핑 (16개)
    df.columns = [
        'Empty0', 'Date',
        'B2C_Qty_Multi', 'B2C_Qty_Neutral', 'B2C_Qty_Hard', 'B2C_Qty_Sum', 'B2C_Sales',
        'B2B_Qty_Multi', 'B2B_Qty_Neutral', 'B2B_Qty_Hard', 'B2B_Qty_Sum',
        'B2B_Sales_Multi', 'B2B_Sales_Neutral', 'B2B_Sales_Hard', 'B2B_Sales_Sum', 'Total_Sales'
    ]

    # 빈 컬럼 제거
    df = df.drop('Empty0', axis=1)

    # 결측치 처리
    df = df.fillna(0)

    # 숫자 변환 함수
    def to_int(x):
        if isinstance(x, str):
            clean_str = x.replace(',', '').replace('₩', '').replace(' ', '').replace('원', '')
            if clean_str == '' or clean_str == '-': return 0
            try:
                return int(float(clean_str))
            except:
                return 0
        elif isinstance(x, (int, float)):
            return int(x)
        return 0

    cols_to_clean = [
        'B2C_Qty_Multi', 'B2C_Qty_Neutral', 'B2C_Qty_Hard', 'B2C_Sales',
        'B2B_Qty_Multi', 'B2B_Qty_Neutral', 'B2B_Qty_Hard',
        'B2B_Sales_Multi', 'B2B_Sales_Neutral', 'B2B_Sales_Hard'
    ]

    for col in cols_to_clean:
        df[col] = df[col].apply(to_int)

    # 날짜 없는 행 제거 (합계 행 등)
    df = df[df['Date'].notna()]
    df = df[df['Date'] != 0]
    df = df[df['Date'] != '']

    # 날짜를 문자열로 변환하여 필터링
    df['Date'] = df['Date'].astype(str)
    df = df[df['Date'].str.contains('2025|2024', na=False)]

    print(f"\n✓ 전처리 완료 - {len(df)}개 데이터")

    # 파생 변수 생성
    df['Total_B2B_Sales'] = df['B2B_Sales_Multi'] + df['B2B_Sales_Neutral'] + df['B2B_Sales_Hard']
    df['Total_Qty_Multi'] = df['B2C_Qty_Multi'] + df['B2B_Qty_Multi']
    df['Total_Qty_Neutral'] = df['B2C_Qty_Neutral'] + df['B2B_Qty_Neutral']
    df['Total_Qty_Hard'] = df['B2C_Qty_Hard'] + df['B2B_Qty_Hard']

    # --- 시각화 데이터 준비 ---
    grand_total_revenue = df['B2C_Sales'].sum() + df['Total_B2B_Sales'].sum()
    grand_total_qty = df['Total_Qty_Multi'].sum() + df['Total_Qty_Neutral'].sum() + df['Total_Qty_Hard'].sum()

    print(f"\n=== 요약 통계 ===")
    print(f"총 매출: ₩{grand_total_revenue:,} ({int(grand_total_revenue/10000):,}만원)")
    print(f"총 판매량: {grand_total_qty:,}개")
    print(f"B2C 매출: ₩{df['B2C_Sales'].sum():,}")
    print(f"B2B 매출: ₩{df['Total_B2B_Sales'].sum():,}")

    # 3. 그래프 그리기
    sns.set_theme(style="whitegrid")
    plt.rcParams['font.family'] = 'Malgun Gothic'  # 한글 폰트
    plt.rcParams['axes.unicode_minus'] = False  # 마이너스 기호 깨짐 방지

    fig = plt.figure(figsize=(16, 14))
    gs = fig.add_gridspec(3, 2, height_ratios=[1, 1.2, 1.2], hspace=0.3, wspace=0.3)

    # [Top] Summary Donuts
    ax_pie1 = fig.add_subplot(gs[0, 0])
    ax_pie2 = fig.add_subplot(gs[0, 1])

    # Revenue Share
    b2c_revenue = df['B2C_Sales'].sum()
    b2b_revenue = df['Total_B2B_Sales'].sum()

    ax_pie1.pie([b2c_revenue, b2b_revenue],
                labels=['B2C', 'B2B'],
                colors=['#FF7F50', '#2F4F4F'],
                autopct='%1.1f%%', startangle=90, pctdistance=0.85,
                wedgeprops=dict(width=0.4, edgecolor='w'), textprops={'fontsize': 11})
    ax_pie1.set_title('채널별 매출 비중', fontweight='bold', fontsize=14, pad=20)
    ax_pie1.text(0, 0, f'총 매출\n{int(grand_total_revenue/10000):,}만원',
                ha='center', va='center', fontweight='bold', fontsize=12)

    # Qty Mix
    qty_sizes = [df['Total_Qty_Multi'].sum(), df['Total_Qty_Neutral'].sum(), df['Total_Qty_Hard'].sum()]
    ax_pie2.pie(qty_sizes,
                labels=['멀티 크림', '뉴트럴 왁스', '하드 글레이즈'],
                colors=sns.color_palette('viridis', 3),
                autopct='%1.1f%%', startangle=90, pctdistance=0.85,
                wedgeprops=dict(width=0.4, edgecolor='w'), textprops={'fontsize': 11})
    ax_pie2.set_title('제품별 판매량 비중', fontweight='bold', fontsize=14, pad=20)
    ax_pie2.text(0, 0, f'총 판매량\n{grand_total_qty:,}개',
                ha='center', va='center', fontweight='bold', fontsize=12)

    # [Middle] Weekly Revenue
    ax_bar1 = fig.add_subplot(gs[1, :])

    x_pos = np.arange(len(df))
    p1 = ax_bar1.bar(x_pos, df['B2C_Sales'], label='B2C', color='#FF7F50', alpha=0.9, width=0.6)
    p2 = ax_bar1.bar(x_pos, df['Total_B2B_Sales'], bottom=df['B2C_Sales'],
                     label='B2B', color='#2F4F4F', alpha=0.9, width=0.6)

    ax_bar1.set_title('주간 매출 추이', fontweight='bold', fontsize=14, pad=15)
    ax_bar1.set_xlabel('주차', fontsize=11)
    ax_bar1.set_ylabel('매출액 (만원)', fontsize=11)
    ax_bar1.set_xticks(x_pos)
    ax_bar1.set_xticklabels(df['Date'].values, rotation=45, ha='right')
    ax_bar1.legend(fontsize=11)
    ax_bar1.yaxis.set_major_formatter(ticker.FuncFormatter(lambda x, p: f'{int(x/10000):,}'))
    ax_bar1.grid(axis='y', alpha=0.3)

    # Total labels
    for i in range(len(df)):
        tot = df['B2C_Sales'].iloc[i] + df['Total_B2B_Sales'].iloc[i]
        if tot > 0:
            ax_bar1.text(i, tot, f'{int(tot/10000)}만', ha='center', va='bottom',
                        fontsize=9, fontweight='bold')

    # [Bottom] Weekly Qty
    ax_bar2 = fig.add_subplot(gs[2, :])

    df_melt = df.melt(id_vars='Date',
                      value_vars=['Total_Qty_Multi', 'Total_Qty_Neutral', 'Total_Qty_Hard'],
                      var_name='Product', value_name='Qty')
    df_melt['Product'] = df_melt['Product'].map({
        'Total_Qty_Multi': '멀티 크림',
        'Total_Qty_Neutral': '뉴트럴 왁스',
        'Total_Qty_Hard': '하드 글레이즈'
    })

    sns.barplot(data=df_melt, x='Date', y='Qty', hue='Product',
                palette='viridis', ax=ax_bar2)
    ax_bar2.set_title('주간 제품별 판매량', fontweight='bold', fontsize=14, pad=15)
    ax_bar2.set_xlabel('주차', fontsize=11)
    ax_bar2.set_ylabel('판매량 (개)', fontsize=11)
    ax_bar2.legend(title='제품', fontsize=10, title_fontsize=11)
    ax_bar2.tick_params(axis='x', rotation=45)
    ax_bar2.grid(axis='y', alpha=0.3)

    for container in ax_bar2.containers:
        ax_bar2.bar_label(container, fmt='%d', padding=3, fontsize=8)

    plt.tight_layout()

    # 그래프 저장
    output_file = 'afterdawn_dashboard.png'
    plt.savefig(output_file, dpi=300, bbox_inches='tight')
    print(f"\n✓ 대시보드 저장: {output_file}")

    plt.show()

    # 데이터 상세 출력
    print("\n=== 주간별 상세 데이터 ===")
    print(df[['Date', 'B2C_Sales', 'Total_B2B_Sales', 'Total_Qty_Multi',
              'Total_Qty_Neutral', 'Total_Qty_Hard']].to_string(index=False))

else:
    print("❌ 데이터 프레임 생성 실패")
