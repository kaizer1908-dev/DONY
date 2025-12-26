import json
import os
from pathlib import Path
from datetime import datetime


class AccountManager:
    """계정별 격리된 데이터 관리"""
    
    def __init__(self, base_dir="accounts_data"):
        self.base_dir = Path(base_dir)
        self.base_dir.mkdir(exist_ok=True)
    
    def get_accounts(self):
        """등록된 계정 목록"""
        accounts = [d.name for d in self.base_dir.iterdir() if d.is_dir()]
        return sorted(accounts)  # 알파벳 순 정렬
    
    def create_account(self, account_id, metadata=None):
        """신규 계정 생성"""
        account_path = self.base_dir / account_id
        
        if account_path.exists():
            return False, "이미 존재하는 계정입니다."
        
        account_path.mkdir(exist_ok=True)
        
        # 계정 메타정보
        meta_file = account_path / "metadata.json"
        meta_file.write_text(json.dumps({
            "account_id": account_id,
            "created_at": datetime.now().isoformat(),
            "metadata": metadata or {}
        }, ensure_ascii=False, indent=2), encoding='utf-8')
        
        # 빈 메모리 파일
        (account_path / "memory.json").write_text("[]", encoding='utf-8')
        (account_path / "patterns.json").write_text("[]", encoding='utf-8')
        
        return True, account_path
    
    def get_memory(self, account_id):
        """계정별 학습 메모리 로드"""
        memory_file = self.base_dir / account_id / "memory.json"
        if memory_file.exists():
            return json.loads(memory_file.read_text(encoding='utf-8'))
        return []
    
    def save_feedback(self, account_id, persona, feedback, context=None):
        """피드백 저장 (계정별 격리)"""
        memory = self.get_memory(account_id)
        memory.append({
            "timestamp": datetime.now().isoformat(),
            "persona": persona,
            "feedback": feedback,
            "context": context or ""  # 어떤 상황에서 나온 피드백인지
        })
        
        memory_file = self.base_dir / account_id / "memory.json"
        memory_file.write_text(json.dumps(memory, ensure_ascii=False, indent=2), encoding='utf-8')
    
    def get_account_metadata(self, account_id):
        """계정 메타정보 조회"""
        meta_file = self.base_dir / account_id / "metadata.json"
        if meta_file.exists():
            return json.loads(meta_file.read_text(encoding='utf-8'))
        return None
