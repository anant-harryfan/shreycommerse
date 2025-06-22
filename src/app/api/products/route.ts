import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');
    
    let products;
    
    if (categoryId) {
      products = await prisma.product.findMany({
        where: {
          categoryId: parseInt(categoryId),
        },
        include: {
          category: true,
        },
      });
    } else {
      products = await prisma.product.findMany({
        include: {
          category: true,
        },
      });
    }
    
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}