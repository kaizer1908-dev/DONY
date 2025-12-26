import streamlit as st
import google.generativeai as genai
import pandas as pd
import os
from datetime import datetime
from account_manager import AccountManager
from multi_file_analyzer import MultiFileAnalyzer

# Page Config
st.set_page_config(page_title="Antigravity: Amazon Strategic Core", page_icon="🚀", layout="wide")

# API Setup
if "GOOGLE_API_KEY" not in st.secrets:
    st.error("Secrets file not found or API key missing.")
    st.stop()
genai.configure(api_key=st.secrets["GOOGLE_API_KEY"])

# Initialize Managers
am = AccountManager()
mfa = MultiFileAnalyzer()

# UI Maps
MODEL_DISPLAY_NAMES = {
    "gemini-2.0-flash-exp": "⚡ Gemini 2.0 Flash Experimental (최신)",
    "gemini-2.0-flash": "⚡ Gemini 2.0 Flash (빠른 응답)",
    "gemini-1.5-pro": "🎯 Gemini 1.5 Pro (균형잡힌 성능)",
    "gemini-1.5-pro-latest": "🎯 Gemini 1.5 Pro Latest (최신 안정)",
    "gemini-1.5-flash": "💨 Gemini 1.5 Flash (경량 빠름)",
    "gemini-1.5-flash-latest": "💨 Gemini 1.5 Flash Latest (최신)",
}

def get_display_name(model_name):
    # 버전 정보와 특성을 포함한 사용자 친화적 이름 반환
    return MODEL_DISPLAY_NAMES.get(model_name, model_name)

def get_available_models():
    """Option B: 안정적인 버전만 필터링하고 최신순 정렬"""
    try:
        all_models = []
        for m in genai.list_models():
            if 'generateContent' in m.supported_generation_methods:
                all_models.append(m.name.replace("models/", ""))
        
        # 제외 키워드 (불안정 버전)
        exclude_keywords = ['preview', 'alpha', 'beta']
        
        stable_models = [
            m for m in all_models 
            if not any(kw in m.lower() for kw in exclude_keywords)
        ]
        
        # 버전 정렬을 위한 헬퍼 함수
        def extract_version(model_name):
            import re
            match = re.search(r'(\d+\.\d+)', model_name)
            return float(match.group(1)) if match else 0.0
        
        stable_models.sort(key=extract_version, reverse=True)
        return stable_models if stable_models else all_models
    except Exception:
        # API 오류 시 기본 모델 반환
        return ["gemini-1.5-flash"]

def save_memory(account_id, persona, feedback, context=None):
    """AccountManager를 통해 피드백 저장"""
    try:
        am.save_feedback(account_id, persona, feedback, context)
    except Exception as e:
        st.error(f"메모리 저장 실패: {e}")

def analyze_with_growth(data_string, persona, system_instruction, model_name, account_id):
    """Gemini API 호출 및 학습 데이터 반영"""
    model = genai.GenerativeModel(model_name)
    
    # 계정별 메모리 로드
    memory = am.get_memory(account_id)
    persona_memory = [m for m in memory if m['persona'] == persona]
    
    # 학습된 내용 요약
    learned_context = ""
    if persona_memory:
        recent_feedback = [m['feedback'] for m in persona_memory[-5:]]
        learned_context = f"\n[User Feedback History for {persona}]\n" + "\n".join(f"- {f}" for f in recent_feedback)
    
    full_prompt = f"""
[Role: {persona}]
{system_instruction}

{learned_context}

[Data Context]
{data_string}
"""
    try:
        response = model.generate_content(full_prompt)
        return response.text
    except Exception as e:
        return f"Error: {str(e)}"

# === Sidebar UI ===
with st.sidebar:
    st.title("🚀 Antigravity")
    st.caption("Strategic AI Core")
    
    # Account Management
    st.header("🏢 Account Manager")
    accounts = am.get_accounts()
    
    if not accounts:
        st.warning("계정이 없습니다. 새 계정을 생성하세요.")
        selected_account = None
    else:
        selected_account = st.selectbox(
            "현재 계정", 
            options=accounts,
            index=0
        )
        if selected_account:
            metadata = am.get_account_metadata(selected_account)
            if metadata:
                st.caption(f"📅 생성: {metadata.get('created_at', '')[:10]}")

    with st.expander("➕ 새 계정 추가"):
        new_account = st.text_input("계정 ID (예: US-MAIN, EU-SHOP)")
        if st.button("생성", key="btn_create_acc"):
            if new_account:
                success, result = am.create_account(new_account)
                if success:
                    st.success(f"✅ 계정 '{new_account}' 생성됨!")
                    st.rerun()
                else:
                    st.error(result)
            else:
                st.error("계정 ID를 입력하세요.")
    
    st.divider()

    # Model Selection
    st.header("⚙️ Intelligence")
    available_models = get_available_models()
    selected_model = st.selectbox(
        "AI Model", 
        available_models,
        format_func=get_display_name
    )

# === Main UI ===
st.title("Antigravity: Amazon Strategic Core")

# File Upload
uploaded_files = st.file_uploader(
    "📂 Business Reports (다중 선택 가능)", 
    type=['xlsx', 'csv', 'txt'],
    accept_multiple_files=True,
    help="Ctrl+클릭으로 여러 파일 동시 선택 가능"
)

if uploaded_files:
    try:
        # 데이터 로드
        dataframes = {}
        file_errors = {}
        
        for file in uploaded_files:
            try:
                if file.name.endswith('.csv'):
                    try:
                        df = pd.read_csv(file, on_bad_lines='skip', encoding='utf-8')
                    except:
                        file.seek(0)
                        df = pd.read_csv(file, on_bad_lines='skip', encoding='cp949')
                elif file.name.endswith(('.xlsx', '.xls')):
                    df = pd.read_excel(file)
                else: 
                    # txt
                    try:
                        content = file.read().decode('utf-8')
                    except:
                        file.seek(0)
                        content = file.read().decode('cp949')
                    df = pd.DataFrame({'content': [content]})
                
                dataframes[file.name] = df
            except Exception as e:
                file_errors[file.name] = str(e)

        if not dataframes:
            st.error("❌ 모든 파일 처리에 실패했습니다.")
            st.stop()

        # 통합 및 크로스 분석 (MultiFileAnalyzer)
        merged_df, summary = mfa.unified_analysis(dataframes)
        cross_results = mfa.cross_analysis(dataframes)
        
        # 분석 준비 완료된 데이터 문자열
        data_string = summary
        
        # 크로스 분석 결과가 있으면 추가
        if 'inventory_vs_sales' in cross_results:
            inv_sales = cross_results['inventory_vs_sales']
            data_string += f"\n\n[Cross-Analysis: Inventory vs Sales]\n{inv_sales['insight']}\n"
            # 상세 데이터 일부 추가 (토큰 제한 고려하여 상위만)
            preview = inv_sales['merged_data'].head(10).to_string()
            data_string += f"\n[Merged Data Preview]\n{preview}"

        # 파일 오류 표시
        if file_errors:
            with st.expander("⚠️ 파일 처리 경고"):
                for f, e in file_errors.items():
                    st.caption(f"{f}: {e}")

        # 데이터 미리보기
        with st.expander("📊 Data Preview", expanded=False):
            st.text(summary)
            st.dataframe(merged_df.head())

    except Exception as e:
        st.error(f"데이터 처리 중 오류: {e}")
        st.stop()

    # 계정 확인
    if not selected_account:
        st.error("⚠️ 계정을 먼저 생성하고 선택하세요.")
        st.stop()

    # 상태 표시
    st.markdown(f"""
    **Current Account:** `{selected_account}` | 
    **Model:** `{get_display_name(selected_model)}` | 
    **Memory:** `Active`
    """)
    st.divider()

    # === 종합 분석 (Comprehensive) ===
    st.header("📊 종합 분석 (Comprehensive Analysis)")
    st.caption("매출 구조 및 광고 구조 중심의 포괄적 분석")
    
    if st.button("🚀 전체 분석 실행", type="primary", use_container_width=True):
        with st.spinner("데이터를 종합 분석 중입니다..."):
            comprehensive_prompt = """
당신은 Amazon 비즈니스 전략 분석가입니다. 
제공된 데이터를 종합적으로 분석하여 핵심 인사이트를 도출하세요.

[분석 항목]
1. **매출 구조 분석**
   - 전체 매출 현황 및 트렌드
   - 주요 상품별/카테고리별 매출 기여도
   - 매출 집중도 및 다각화 수준

2. **광고 구조 분석**
   - 광고 지출 대비 성과 (ROAS, ACoS)
   - 캠페인별/키워드별 효율성
   - 광고비 최적화 기회

3. **종합 건강도 평가**
   - 재무 안정성 (수익성, 현금흐름)
   - 운영 효율성 (재고 회전, 리드타임)
   - 리스크 요인 및 기회

[출력 형식]
### 📈 매출 구조
- 핵심 지표 및 인사이트

### 💰 광고 구조  
- 핵심 지표 및 인사이트

### ⚠️ 주요 발견사항
- 즉시 조치 필요 항목
- 개선 기회

### 💡 전략 제안
- 구체적인 액션 아이템
"""
            result = analyze_with_growth(data_string, "COMPREHENSIVE", comprehensive_prompt, selected_model, selected_account)
            st.session_state['comprehensive_analysis'] = result
            
            # 충돌 감지 (Experimental)
            memory = am.get_memory(selected_account)
            conflicts = mfa.detect_conflicts(result, memory)
            if conflicts:
                st.session_state['conflicts'] = conflicts

    # 결과 표시
    if 'comprehensive_analysis' in st.session_state:
        st.markdown(st.session_state['comprehensive_analysis'])
        
        # 충돌 경고
        if 'conflicts' in st.session_state and st.session_state['conflicts']:
            with st.expander("⚠️ 전략적 충돌 감지됨!", expanded=True):
                for conflict in st.session_state['conflicts']:
                    st.warning(f"과거 피드백({conflict['past_date']})과 충돌 가능성: {conflict['conflict_reason']}")
                    st.caption(f"과거: {conflict['past_feedback']}")

        with st.expander("💬 종합 분석 피드백"):
            comp_feedback = st.text_area("의견 입력", key="fb_comp")
            if st.button("저장", key="save_comp"):
                save_memory(selected_account, "COMPREHENSIVE", comp_feedback, context=st.session_state.get('comprehensive_analysis', '')[:200])
                st.success("✅ 피드백 저장됨")

    st.divider()
    st.header("🎯 담당자별 세부 인사이트")

    # JIAN (Operations)
    with st.expander("📦 JIAN - 재고 & 물류 전략"):
        if st.button("🔍 JIAN 분석", key="btn_jian"):
            with st.spinner("Analyzing logistics..."):
                prompt = "재고 회전율, 리드타임(15일 기준), 품절 리스크를 분석하고 보수적인 발주량을 제안하라."
                res = analyze_with_growth(data_string, "JIAN", prompt, selected_model, selected_account)
                st.session_state['jian_res'] = res
        
        if 'jian_res' in st.session_state:
            st.markdown(st.session_state['jian_res'])
            fb = st.text_input("JIAN Feedback:", key="fb_jian")
            if st.button("💾 저장", key="save_jian"):
                save_memory(selected_account, "JIAN", fb, context=st.session_state.get('jian_res', '')[:200])
                st.success("저장됨")

    # CFO (Financial)
    with st.expander("💰 CFO - 재무 & 수익성 분석"):
        if st.button("🔍 CFO 분석", key="btn_cfo"):
            with st.spinner("Analyzing finances..."):
                prompt = "순이익(Net Profit)과 ROAS를 계산하고, 현금 흐름의 위험요소를 비관적으로 분석하라."
                res = analyze_with_growth(data_string, "CFO", prompt, selected_model, selected_account)
                st.session_state['cfo_res'] = res
        
        if 'cfo_res' in st.session_state:
            st.markdown(st.session_state['cfo_res'])
            fb = st.text_input("CFO Feedback:", key="fb_cfo")
            if st.button("💾 저장", key="save_cfo"):
                save_memory(selected_account, "CFO", fb, context=st.session_state.get('cfo_res', '')[:200])
                st.success("저장됨")

    # LOGIC
    with st.expander("🧠 Logic - 전략적 사고"):
        if st.button("🔍 Logic 분석", key="btn_logic"):
            with st.spinner("Analyzing logic..."):
                prompt = "데이터의 인과관계를 의심하고, 5 Whys 기법으로 성과의 근본 원인을 파헤쳐라."
                res = analyze_with_growth(data_string, "LOGIC", prompt, selected_model, selected_account)
                st.session_state['logic_res'] = res
        
        if 'logic_res' in st.session_state:
            st.markdown(st.session_state['logic_res'])

else:
    st.info("👋 왼쪽 사이드바에서 파일을 업로드하여 분석을 시작하세요.")
