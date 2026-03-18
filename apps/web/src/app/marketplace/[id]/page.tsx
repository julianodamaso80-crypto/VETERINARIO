'use client';

export const dynamic = "force-dynamic";

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import { Star, Truck, ShoppingCart, ArrowLeft, Plus, Minus } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/contexts/cart-context';
import { useToast } from '@/hooks/use-toast';
import { useParams, useRouter } from 'next/navigation';

export default function ProductDetailPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    const [quantity, setQuantity] = useState(1);
    const { addItem } = useCart();
    const { toast } = useToast();

    const { data: product, isLoading, isError } = useQuery({
        queryKey: ['marketplace-listing', id],
        queryFn: async () => {
            const response = await api.get(`/marketplace/listings/${id}`);
            return response.data;
        },
        enabled: !!id,
        retry: 1,
    });

    const handleAddToCart = () => {
        if (!product) return;

        addItem({
            id: product.id,
            title: product.title,
            price: Number(product.price),
            sellerId: product.seller?.id || product.sellerId,
            image: product.images?.[0],
            quantity
        });

        toast({
            title: "Added to cart",
            description: `${quantity}x ${product.title} added successfully.`,
        });
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (isError || !product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
                <h2 className="text-2xl font-bold mb-2">Produto não encontrado</h2>
                <p className="text-gray-500 mb-6">O produto que você está procurando não existe ou foi removido.</p>
                <Button onClick={() => router.push('/marketplace')}>Voltar para o Marketplace</Button>
            </div>
        );
    }

    const isOutOfStock = product.stock <= 0;

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white border-b sticky top-0 z-10">
                <div className="container mx-auto py-4 px-4">
                    <div className="flex items-center justify-between">
                        <Link href="/marketplace" className="text-primary hover:underline flex items-center gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            Voltar aos produtos
                        </Link>
                    </div>
                </div>
            </header>

            <div className="container mx-auto py-8 px-4">
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Image Gallery */}
                    <div className="space-y-4">
                        <div className="aspect-square bg-white rounded-lg border flex items-center justify-center overflow-hidden">
                            {product.images?.[0] ? (
                                <img
                                    src={product.images[0]}
                                    alt={product.title}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="text-gray-400">Sem imagem</div>
                            )}
                        </div>
                    </div>

                    {/* Product Details */}
                    <div>
                        <div className="mb-2 text-sm text-gray-500">
                            Vendido por: <span className="font-medium text-gray-900">{product.seller?.name || 'Vendedor Parceiro'}</span>
                        </div>

                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>

                        <div className="flex items-center gap-4 mb-4">
                            <div className="flex items-center gap-1">
                                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                                <span className="font-medium">{Number(product.averageRating || 0).toFixed(1)}</span>
                                <span className="text-gray-500">({product.totalReviews || 0} avaliações)</span>
                            </div>
                        </div>

                        <div className="flex items-baseline gap-4 mb-6">
                            <span className="text-4xl font-bold text-primary">
                                {formatCurrency(Number(product.price))}
                            </span>
                            {product.compareAtPrice && (
                                <span className="text-lg text-gray-400 line-through">
                                    {formatCurrency(Number(product.compareAtPrice))}
                                </span>
                            )}
                        </div>

                        <Card className="mb-6 border-primary/20 bg-primary/5">
                            <CardContent className="p-4">
                                <div className="flex items-center gap-3">
                                    <div className="bg-primary/20 p-2 rounded-full text-primary">
                                        <Truck className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">
                                            {product.freeShipping ? 'Frete Grátis disponível' : 'Cálculo de Frete'}
                                        </h4>
                                        <p className="text-sm text-gray-600">
                                            Entregue no seu endereço
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="space-y-4">
                            {isOutOfStock && (
                                <div className="p-4 bg-red-50 text-red-600 rounded-md font-medium text-center mb-4">
                                    Produto esgotado (Out of stock)
                                </div>
                            )}

                            <div className="flex items-center gap-4">
                                <span className="font-medium text-gray-700">Quantidade:</span>
                                <div className="flex items-center border rounded-md">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="px-3 py-2 hover:bg-gray-100"
                                        disabled={isOutOfStock}
                                    >
                                        <Minus className="h-4 w-4" />
                                    </button>
                                    <span className="px-4 py-2 font-medium">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(Math.min(product.stock || 10, quantity + 1))}
                                        className="px-3 py-2 hover:bg-gray-100"
                                        disabled={isOutOfStock}
                                    >
                                        <Plus className="h-4 w-4" />
                                    </button>
                                </div>
                                <span className="text-sm text-gray-500">{product.stock} disponíveis</span>
                            </div>

                            <Button
                                size="lg"
                                className={`w-full h-14 text-lg mt-4 ${isOutOfStock ? 'opacity-50' : ''}`}
                                onClick={() => {
                                    if (isOutOfStock) {
                                        toast({
                                            title: "Out of stock",
                                            description: "This product is currently out of stock.",
                                            variant: "destructive"
                                        });
                                        return;
                                    }
                                    handleAddToCart();
                                }}
                            >
                                <ShoppingCart className="h-5 w-5 mr-2" />
                                Add to cart
                            </Button>
                        </div>

                        {product.description && (
                            <div className="mt-8 pt-8 border-t">
                                <h3 className="text-xl font-bold mb-4">Descrição do Produto</h3>
                                <div className="prose text-gray-600">
                                    {product.description}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
