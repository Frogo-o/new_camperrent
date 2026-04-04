import ProductCard from "@/components/ProductCard";

export default function ProductGrid({ products = [] }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {products.map((p) => (
                <ProductCard key={p.id} p={p} />
            ))}
        </div>
    );
}
