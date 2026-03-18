'use client';

import { useCart } from '@/contexts/cart-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import { Trash2, ShoppingCart, Plus, Minus, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CartPage() {
    const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();

    const handleCheckout = () => {
        // In a real app, this would integrate with a payment gateway
        alert('Funcionalidade de Checkout será implementada em breve!');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white border-b border-[#E97700]/10 sticky top-0 z-10 px-4 py-4">
                <div className="container mx-auto flex items-center justify-between">
                    <Link href="/marketplace" className="text-2xl font-bold text-[#D1470B]">
                        PetPro Marketplace
                    </Link>
                    <nav className="flex items-center gap-6">
                        <Link href="/marketplace" className="text-gray-700 hover:text-[#E97700] transition-colors">
                            Voltar as Compras
                        </Link>
                    </nav>
                </div>
            </header>

            <div className="container mx-auto py-8 px-4">
                <h1 className="text-3xl font-bold mb-8 flex items-center gap-3 text-gray-900">
                    <ShoppingCart className="h-8 w-8 text-primary" />
                    Seu Carrinho
                </h1>

                {items.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-lg border shadow-sm">
                        <ShoppingCart className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                        <h2 className="text-2xl font-medium text-gray-600 mb-2">Seu carrinho está vazio</h2>
                        <p className="text-gray-500 mb-6">Que tal explorar nossos produtos para pets?</p>
                        <Link href="/marketplace">
                            <Button size="lg">Ir para o Marketplace</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-4">
                            {items.map((item) => (
                                <Card key={item.id} className="overflow-hidden">
                                    <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center">
                                        <div className="w-full sm:w-24 h-24 bg-gray-100 rounded-md shrink-0 border flex items-center justify-center overflow-hidden">
                                            {item.image ? (
                                                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                            ) : (
                                                <ShoppingCart className="h-8 w-8 text-gray-300" />
                                            )}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-lg text-gray-900 truncate mb-1">
                                                <Link href={`/marketplace/${item.id}`} className="hover:text-primary transition-colors">
                                                    {item.title}
                                                </Link>
                                            </h3>
                                            <p className="text-gray-500 font-medium">{formatCurrency(item.price)}</p>
                                        </div>

                                        <div className="flex items-center gap-4 w-full sm:w-auto mt-4 sm:mt-0 justify-between sm:justify-end">
                                            <div className="flex items-center border rounded-md bg-white">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                                                >
                                                    <Minus className="h-4 w-4" />
                                                </button>
                                                <span className="px-4 py-2 font-medium w-12 text-center select-none">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                                                >
                                                    <Plus className="h-4 w-4" />
                                                </button>
                                            </div>

                                            <div className="flex items-center gap-4">
                                                <div className="text-lg font-bold w-24 text-right">
                                                    {formatCurrency(item.price * item.quantity)}
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                                    onClick={() => removeItem(item.id)}
                                                >
                                                    <Trash2 className="h-5 w-5" />
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}

                            <div className="flex justify-between items-center pt-4">
                                <Button variant="outline" className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600" onClick={clearCart}>
                                    Limpar Carrinho
                                </Button>
                            </div>
                        </div>

                        <div className="lg:col-span-1">
                            <Card className="sticky top-24">
                                <CardContent className="p-6">
                                    <h3 className="text-xl font-bold mb-4">Resumo do Pedido</h3>

                                    <div className="space-y-3 mb-6 border-b pb-6">
                                        <div className="flex justify-between text-gray-600">
                                            <span>Subtotal ({items.reduce((acc, i) => acc + i.quantity, 0)} itens)</span>
                                            <span>{formatCurrency(totalPrice)}</span>
                                        </div>
                                        <div className="flex justify-between text-gray-600">
                                            <span>Frete</span>
                                            <span className="text-green-600 font-medium">Grátis</span>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-end mb-6">
                                        <span className="text-lg font-medium text-gray-900">Total</span>
                                        <span className="text-3xl font-bold text-primary">{formatCurrency(totalPrice)}</span>
                                    </div>

                                    <Button className="w-full" size="lg" onClick={handleCheckout}>
                                        Finalizar Compra
                                        <ArrowRight className="h-5 w-5 ml-2" />
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
