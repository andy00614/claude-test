-- 创建联系人表
CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  image TEXT,
  status TEXT CHECK (status IN ('Active', 'Inactive')) DEFAULT 'Active',
  location TEXT,
  verified BOOLEAN DEFAULT false,
  value INTEGER CHECK (value >= 0 AND value <= 100),
  join_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建推荐关系表
CREATE TABLE referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_id UUID REFERENCES contacts(id) ON DELETE CASCADE,
  referrer_name TEXT NOT NULL,
  referrer_image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 启用行级安全策略（RLS）
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;

-- 创建允许所有操作的策略（开发环境用）
CREATE POLICY "Allow all operations on contacts" ON contacts FOR ALL USING (true);
CREATE POLICY "Allow all operations on referrals" ON referrals FOR ALL USING (true);

-- 创建索引以提高查询性能
CREATE INDEX idx_contacts_status ON contacts(status);
CREATE INDEX idx_contacts_verified ON contacts(verified);
CREATE INDEX idx_contacts_created_at ON contacts(created_at);
CREATE INDEX idx_referrals_contact_id ON referrals(contact_id);