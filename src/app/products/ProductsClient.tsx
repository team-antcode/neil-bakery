"use client"

import { useMemo, useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import type { ProductsData } from "@/types"
import { formatPrice } from "@/lib/utils"

type Props = {
    products: ProductsData
}

type CategoryKey = "bread" | "pastries" | "cakes" | "drinks" | "sweets"
type FilterKey = "all" | CategoryKey

type ProductItem = {
    name: string
    description: string
    price: number
    image: string
}

type Category = {
    key: CategoryKey
    name: string
    items: ProductItem[]
}

export default function ProductsClient({ products }: Props) {
    const categories: Category[] = useMemo(
        () => [
            { key: "bread", name: "Breads", items: products.bread ?? [] },
            { key: "pastries", name: "Pastries", items: products.pastries ?? [] },
            { key: "cakes", name: "Cakes", items: products.cakes ?? [] },
            { key: "drinks", name: "Drinks", items: products.drinks ?? [] },
            { key: "sweets", name: "Sweets", items: (products as any).sweets ?? [] },
        ],
        [products],
    )

    const [selected, setSelected] = useState<FilterKey[]>(["all"])
    const isAllActive = selected.includes("all")

    // Handle hash navigation on mount and hash changes
    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.slice(1) 
            if (hash) {
                // Small delay to ensure DOM is ready
                setTimeout(() => {
                    const element = document.getElementById(hash)
                    if (element) {
                        const offset = 100 
                        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
                        const offsetPosition = elementPosition - offset
                        
                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        })
                        
                        // Update filter to show the category
                        const categoryKey = hash as FilterKey
                        if (categoryKey !== 'all' && ['bread', 'pastries', 'cakes', 'drinks', 'sweets'].includes(categoryKey)) {
                            setSelected([categoryKey])
                        }
                    }
                }, 100)
            }
        }

        // Handle initial hash on mount
        handleHashChange()

        // Listen for hash changes
        window.addEventListener('hashchange', handleHashChange)
        
        return () => {
            window.removeEventListener('hashchange', handleHashChange)
        }
    }, [])

    const heroButtons: { key: FilterKey; label: string }[] = [
        { key: "all", label: "All" },
        { key: "bread", label: "Bread" },
        { key: "pastries", label: "Pastries" },
        { key: "cakes", label: "Cakes" },
        { key: "drinks", label: "Drinks" },
        { key: "sweets", label: "Sweets" },
    ]

    const toggleFilter = (key: FilterKey) => {
        setSelected((prev) => {
            if (key === "all") return ["all"]
            if (prev.includes("all")) return [key]
            const exists = prev.includes(key)
            const next = exists ? prev.filter((x) => x !== key) : [...prev, key]
            return next.length === 0 ? ["all"] : next
        })
    }

    const visibleCategories: Category[] = useMemo(() => {
        if (isAllActive) return categories
        const selectedKeys = selected.filter((k): k is CategoryKey => k !== "all")
        return categories.filter((c) => selectedKeys.includes(c.key))
    }, [categories, selected, isAllActive])

    return (
        <div className="min-h-screen bg-[#fbfbfc]">
            {/* Hero Header - Customized Modern Design */}
            <div className="relative h-[40vh] min-h-[400px] overflow-hidden pt-20">
                {/* Background Image with Overlay */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: "url('/neli_banner.png')" }}
                >
                    <div className="absolute inset-0 bg-black/50" />
                </div>

                {/* Content Container */}
                <div className="relative h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
                    <div className="max-w-6xl mx-auto w-full text-center space-y-6">
                        {/* Badge - Hidden on mobile if needed */}
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                            <span>✨</span>
                            <span>Fresh Daily Since 1990</span>
                        </div>

                        {/* Title Section */}
                        <div className="space-y-2">
                            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-none">
                                Our Menu
                            </h1>
                            <p className="text-lg sm:text-xl text-white/90 font-light max-w-2xl mx-auto">
                                Freshly baked breads, pastries, cakes, drinks, and sweets every day.
                            </p>
                        </div>

                        {/* Filter Pills - Compact Design */}
                        <div className="flex justify-center pt-2">
                            <div className="inline-flex flex-wrap items-center justify-center gap-2 bg-white/95 backdrop-blur-xl rounded-2xl p-2 shadow-2xl border border-white/20">
                                {heroButtons.map((btn) => {
                                    const active = selected.includes(btn.key)
                                    return (
                                        <button
                                            key={btn.label}
                                            onClick={() => toggleFilter(btn.key)}
                                            className={[
                                                "px-5 sm:px-6 py-2 sm:py-2.5 rounded-xl text-sm sm:text-base font-semibold",
                                                "transition-all duration-300 ease-out",
                                                "hover:scale-105 active:scale-95",
                                                active
                                                    ? "bg-gray-900 text-white shadow-md"
                                                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
                                            ].join(" ")}
                                        >
                                            {btn.label}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Products */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
                <div className="space-y-20">
                    {visibleCategories.map((category) => (
                        <section key={category.key} id={category.key} className="space-y-10 scroll-mt-24">
                            {/* Category Header */}
                            <div className="flex items-center gap-4">
                                <h2 className="text-4xl sm:text-5xl font-bold text-neutral-900 tracking-tight">{category.name}</h2>
                                <div className="h-px flex-1 bg-neutral-900/60"></div>
                            </div>

                            {/* Products Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
                                {category.items.map((product, index) => (
                                    <div
                                        key={`${category.key}-${index}`}
                                        className="group relative bg-white rounded-2xl overflow-hidden border border-neutral-200 hover:border-neutral-300 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
                                    >
                                        {/* Product Image */}
                                        <div className="relative h-56 sm:h-64 bg-neutral-100 overflow-hidden">
                                            <Image
                                                src={product.image || "/placeholder.svg"}
                                                alt={product.name}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                                priority={index < 4}
                                                onError={(event) => {
                                                    event.currentTarget.src = "/logo.png";
                                                }}
                                            />
                                        </div>

                                        {/* Product Info */}
                                        <div className="p-5 sm:p-6 space-y-4">
                                            <div className="space-y-2">
                                                <h3 className="text-xl font-bold text-neutral-900 line-clamp-1">{product.name}</h3>
                                                <p className="text-sm text-neutral-600 line-clamp-2 leading-relaxed">{product.description}</p>
                                            </div>

                                            <div className="flex items-center justify-between pt-3 border-t border-neutral-200">
                                                <span className="text-2xl font-bold text-neutral-900">
                                                    {product.name === "Smoothie" && product.price === 0
                                                        ? "Price coming soon" // TODO: replace the Smoothie placeholder price.
                                                        : formatPrice(product.price)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            </div>

            {/* CTA Section */}
            <div className="mt-12 mb-20 sm:mt-8 md:mt-3 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="bg-linear-to-r from-gray-50 to-white rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center border border-gray-100 shadow-lg">
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                            Ready to Order?
                        </h3>

                        <p className="text-sm sm:text-base text-gray-600 mb-6 max-w-xl mx-auto leading-relaxed">
                            Contact us today to place your order for fresh, artisan baked goods.
                        </p>

                        <Link
                            href="/#contact"
                            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-[#e98d1a] font-semibold rounded-full hover:shadow-xl transition-all duration-300 border-2 border-[#e98d1a] hover:bg-[#e98d1a] hover:text-white group text-sm sm:text-base"
                        >
                            <span>Get in Touch</span>
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    )
}
