import pandas as pd
import re
from datetime import datetime

class MultiFileAnalyzer:
    """통합 + 크로스 분석 엔진"""
    
    def unified_analysis(self, dataframes_dict):
        """모든 파일을 하나로 합쳐 통합 분석"""
        all_dfs = []
        for name, df in dataframes_dict.items():
            # 원본 데이터 보존을 위해 복사
            df_copy = df.copy()
            df_copy['_source_file'] = name
            all_dfs.append(df_copy)
            
        merged_df = pd.concat(all_dfs, ignore_index=True)
        
        summary = f"""
[통합 데이터 요약]
- 총 파일 수: {len(dataframes_dict)}개
- 총 데이터 행: {len(merged_df)}행
- 데이터 소스: {', '.join(dataframes_dict.keys())}
- 컬럼 목록: {', '.join(merged_df.columns)}

[데이터 미리보기]
{merged_df.head().to_string()}
"""
        return merged_df, summary
    
    def cross_analysis(self, dataframes_dict):
        """파일 간 상관관계 분석 (기초 버전)"""
        results = {}
        file_keys = [k.lower() for k in dataframes_dict.keys()]
        
        # 1. 재고 vs 판매 분석 (Inventory vs Sales)
        # 파일명에 'inventory'와 'sales'가 포함된 경우
        inv_key = next((k for k in dataframes_dict.keys() if 'inventory' in k.lower() or 'stock' in k.lower() or '재고' in k), None)
        sales_key = next((k for k in dataframes_dict.keys() if 'sales' in k.lower() or 'order' in k.lower() or '판매' in k), None)
        
        if inv_key and sales_key:
            inv_df = dataframes_dict[inv_key]
            sales_df = dataframes_dict[sales_key]
            
            # 공통 컬럼 찾기 (SKU, Product ID, ASIN 등)
            common_cols = list(set(inv_df.columns) & set(sales_df.columns))
            key_col = next((c for c in common_cols if 'sku' in c.lower() or 'asin' in c.lower() or 'id' in c.lower()), None)
            
            if key_col:
                merged = pd.merge(inv_df, sales_df, on=key_col, how='inner', suffixes=('_inv', '_sales'))
                
                # 분석: 재고 회전율 추정 (판매량이 있는데 재고가 적은 경우 등)
                # 실제 데이터 컬럼명을 모르므로 여기서는 구조만 잡음
                results['inventory_vs_sales'] = {
                    "merged_data": merged,
                    "key_column": key_col,
                    "insight": f"'{inv_key}'와 '{sales_key}'를 '{key_col}' 기준으로 병합했습니다. 총 {len(merged)}개의 공통 상품을 발견했습니다."
                }
            else:
                results['error'] = "재고와 판매 파일을 찾았으나 공통 키 컬럼(SKU, ASIN 등)을 찾을 수 없습니다."
        
        return results
    
    def detect_conflicts(self, current_insight, historical_memory):
        """기존 학습과 충돌 감지 (키워드 기반 단순 감지)"""
        conflicts = []
        
        # 반대되는 키워드 쌍
        antonyms = [
            ("늘려라", "줄여라"),
            ("확대", "축소"),
            ("공격적", "보수적"),
            ("increase", "decrease"),
            ("agressive", "conservative")
        ]
        
        for mem in historical_memory:
            past_feedback = mem.get('feedback', '')
            
            # 과거 피드백과 현재 인사이트가 반대되는 단어를 포함하는지 확인
            for word1, word2 in antonyms:
                if (word1 in past_feedback and word2 in current_insight) or \
                   (word2 in past_feedback and word1 in current_insight):
                    conflicts.append({
                        "past_date": mem.get('timestamp', '')[:10],
                        "past_feedback": past_feedback,
                        "conflict_reason": f"과거엔 '{word1}'를 원했으나, 현재는 '{word2}'가 언급됨"
                    })
        
        return conflicts
