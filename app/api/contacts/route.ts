import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export type Contact = {
  id: string;
  image: string;
  name: string;
  status: string;
  location: string;
  verified: boolean;
  referral: {
    name: string;
    image: string;
  };
  value: number;
  joinDate: string;
};

export async function GET() {
  try {
    // 从 Supabase 获取联系人数据，并联接推荐关系表
    const { data: contacts, error } = await supabase
      .from('contacts')
      .select(`
        id,
        name,
        image,
        status,
        location,
        verified,
        value,
        join_date,
        referrals (
          referrer_name,
          referrer_image
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching contacts:', error);
      return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 500 });
    }

    // 转换数据格式以匹配前端期望的格式
    const formattedContacts = contacts?.map(contact => ({
      id: contact.id,
      name: contact.name,
      image: contact.image || '',
      status: contact.status,
      location: contact.location || '',
      verified: contact.verified,
      value: contact.value,
      joinDate: contact.join_date,
      referral: {
        name: contact.referrals?.[0]?.referrer_name || '',
        image: contact.referrals?.[0]?.referrer_image || ''
      }
    })) || [];

    return NextResponse.json(formattedContacts);
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, image, status, location, verified, value, referral } = body;

    // 插入联系人数据
    const { data: contact, error: contactError } = await supabase
      .from('contacts')
      .insert([{
        name,
        image,
        status: status || 'Active',
        location,
        verified: verified || false,
        value: value || 0,
        join_date: new Date().toISOString().split('T')[0]
      }])
      .select()
      .single();

    if (contactError) {
      console.error('Error creating contact:', contactError);
      return NextResponse.json({ error: 'Failed to create contact' }, { status: 500 });
    }

    // 插入推荐关系数据
    if (referral && referral.name) {
      const { error: referralError } = await supabase
        .from('referrals')
        .insert([{
          contact_id: contact.id,
          referrer_name: referral.name,
          referrer_image: referral.image || ''
        }]);

      if (referralError) {
        console.error('Error creating referral:', referralError);
        // 不返回错误，因为联系人已经创建成功
      }
    }

    return NextResponse.json({ message: 'Contact created successfully', contact });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, name, image, status, location, verified, value, referral } = body;

    // 更新联系人数据
    const { error: contactError } = await supabase
      .from('contacts')
      .update({
        name,
        image,
        status,
        location,
        verified,
        value,
        updated_at: new Date().toISOString()
      })
      .eq('id', id);

    if (contactError) {
      console.error('Error updating contact:', contactError);
      return NextResponse.json({ error: 'Failed to update contact' }, { status: 500 });
    }

    // 更新推荐关系数据
    if (referral && referral.name) {
      const { error: referralError } = await supabase
        .from('referrals')
        .update({
          referrer_name: referral.name,
          referrer_image: referral.image || ''
        })
        .eq('contact_id', id);

      if (referralError) {
        console.error('Error updating referral:', referralError);
        // 不返回错误，因为联系人已经更新成功
      }
    }

    return NextResponse.json({ message: 'Contact updated successfully' });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Contact ID is required' }, { status: 400 });
    }

    // 删除联系人（推荐关系会因为外键约束自动删除）
    const { error } = await supabase
      .from('contacts')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting contact:', error);
      return NextResponse.json({ error: 'Failed to delete contact' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}