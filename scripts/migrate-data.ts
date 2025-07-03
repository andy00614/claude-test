import 'dotenv/config';
import { supabase } from '../lib/supabase';

// 现有的模拟数据
const mockContacts = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
    name: "John Smith",
    status: "Active",
    location: "New York, USA",
    verified: true,
    referral: {
      name: "Sarah Johnson",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face"
    },
    value: 85,
    joinDate: "2024-01-15"
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
    name: "Emily Chen",
    status: "Inactive",
    location: "San Francisco, USA",
    verified: false,
    referral: {
      name: "Mike Wilson",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face"
    },
    value: 42,
    joinDate: "2024-02-20"
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
    name: "David Rodriguez",
    status: "Active",
    location: "Miami, USA",
    verified: true,
    referral: {
      name: "Lisa Anderson",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=32&h=32&fit=crop&crop=face"
    },
    value: 78,
    joinDate: "2023-12-10"
  },
  {
    id: "4",
    image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=32&h=32&fit=crop&crop=face",
    name: "Jessica Williams",
    status: "Active",
    location: "London, UK",
    verified: false,
    referral: {
      name: "Tom Brown",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=32&h=32&fit=crop&crop=face"
    },
    value: 92,
    joinDate: "2024-03-05"
  },
  {
    id: "5",
    image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=32&h=32&fit=crop&crop=face",
    name: "Michael Johnson",
    status: "Inactive",
    location: "Toronto, Canada",
    verified: true,
    referral: {
      name: "Anna Davis",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=32&h=32&fit=crop&crop=face"
    },
    value: 35,
    joinDate: "2024-01-28"
  },
  {
    id: "6",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=32&h=32&fit=crop&crop=face",
    name: "Amanda Taylor",
    status: "Active",
    location: "Sydney, Australia",
    verified: true,
    referral: {
      name: "Robert Lee",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
    },
    value: 67,
    joinDate: "2024-02-14"
  },
  {
    id: "7",
    image: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=32&h=32&fit=crop&crop=face",
    name: "Carlos Martinez",
    status: "Active",
    location: "Barcelona, Spain",
    verified: false,
    referral: {
      name: "Maria Garcia",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face"
    },
    value: 73,
    joinDate: "2023-11-22"
  },
  {
    id: "8",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=32&h=32&fit=crop&crop=face",
    name: "Sophie Mueller",
    status: "Inactive",
    location: "Berlin, Germany",
    verified: true,
    referral: {
      name: "James Wilson",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face"
    },
    value: 29,
    joinDate: "2024-03-18"
  },
  {
    id: "9",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=32&h=32&fit=crop&crop=face",
    name: "Rachel Kim",
    status: "Active",
    location: "Seoul, South Korea",
    verified: true,
    referral: {
      name: "Kevin Zhang",
      image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=32&h=32&fit=crop&crop=face"
    },
    value: 88,
    joinDate: "2024-01-08"
  },
  {
    id: "10",
    image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=32&h=32&fit=crop&crop=face",
    name: "Thomas Anderson",
    status: "Inactive",
    location: "Chicago, USA",
    verified: false,
    referral: {
      name: "Jennifer Smith",
      image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=32&h=32&fit=crop&crop=face"
    },
    value: 51,
    joinDate: "2024-02-25"
  },
  {
    id: "11",
    image: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=32&h=32&fit=crop&crop=face",
    name: "Isabella Lopez",
    status: "Active",
    location: "Mexico City, Mexico",
    verified: true,
    referral: {
      name: "Alex Chen",
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=32&h=32&fit=crop&crop=face"
    },
    value: 95,
    joinDate: "2023-10-30"
  },
  {
    id: "12",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face",
    name: "Ryan O'Connor",
    status: "Active",
    location: "Dublin, Ireland",
    verified: false,
    referral: {
      name: "Emma Thompson",
      image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=32&h=32&fit=crop&crop=face"
    },
    value: 62,
    joinDate: "2024-01-12"
  },
  {
    id: "13",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=32&h=32&fit=crop&crop=face",
    name: "Priya Patel",
    status: "Inactive",
    location: "Mumbai, India",
    verified: true,
    referral: {
      name: "David Kumar",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=32&h=32&fit=crop&crop=face"
    },
    value: 38,
    joinDate: "2024-03-01"
  },
  {
    id: "14",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=32&h=32&fit=crop&crop=face",
    name: "Lucas Silva",
    status: "Active",
    location: "São Paulo, Brazil",
    verified: true,
    referral: {
      name: "Camila Santos",
      image: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=32&h=32&fit=crop&crop=face"
    },
    value: 81,
    joinDate: "2023-12-05"
  },
  {
    id: "15",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=32&h=32&fit=crop&crop=face",
    name: "Olivia Peterson",
    status: "Inactive",
    location: "Stockholm, Sweden",
    verified: false,
    referral: {
      name: "Erik Larsson",
      image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=32&h=32&fit=crop&crop=face"
    },
    value: 47,
    joinDate: "2024-02-08"
  }
];

async function migrateData() {
  console.log('🚀 开始数据迁移...');
  
  try {
    // 1. 测试连接
    console.log('🔍 测试数据库连接...');
    const { data: testData, error: testError } = await supabase
      .from('contacts')
      .select('id')
      .limit(1);
    
    if (testError) {
      console.error('❌ 数据库连接失败:', testError.message);
      console.log('💡 请确保在 Supabase 中已经创建了 contacts 和 referrals 表');
      return;
    }
    
    console.log('✅ 数据库连接成功！');
    
    // 2. 清空现有数据
    console.log('🧹 清空现有数据...');
    const { error: clearReferralsError } = await supabase
      .from('referrals')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000');
    
    const { error: clearContactsError } = await supabase
      .from('contacts')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000');
    
    if (clearReferralsError || clearContactsError) {
      console.log('⚠️  清空数据时有警告，继续执行...');
    }
    
    // 3. 插入联系人数据
    console.log('👥 插入联系人数据...');
    const contactsData = mockContacts.map(contact => ({
      name: contact.name,
      image: contact.image,
      status: contact.status,
      location: contact.location,
      verified: contact.verified,
      value: contact.value,
      join_date: contact.joinDate
    }));
    
    const { data: insertedContacts, error: contactsError } = await supabase
      .from('contacts')
      .insert(contactsData)
      .select('*');
    
    if (contactsError) {
      console.error('❌ 插入联系人数据失败:', contactsError);
      return;
    }
    
    console.log(`✅ 成功插入 ${insertedContacts.length} 个联系人`);
    
    // 4. 插入推荐关系数据
    console.log('🔗 插入推荐关系数据...');
    const referralsData = insertedContacts.map((contact, index) => ({
      contact_id: contact.id,
      referrer_name: mockContacts[index].referral.name,
      referrer_image: mockContacts[index].referral.image
    }));
    
    const { data: insertedReferrals, error: referralsError } = await supabase
      .from('referrals')
      .insert(referralsData)
      .select('*');
    
    if (referralsError) {
      console.error('❌ 插入推荐关系数据失败:', referralsError);
      return;
    }
    
    console.log(`✅ 成功插入 ${insertedReferrals.length} 个推荐关系`);
    console.log('🎉 数据迁移完成！');
    
  } catch (error) {
    console.error('❌ 数据迁移失败:', error);
  }
}

// 执行迁移
migrateData();