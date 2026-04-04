const KEY = "cart_v1";

export function readCart() {
    if (typeof window === "undefined") return [];
    try {
        return JSON.parse(localStorage.getItem(KEY) || "[]");
    } catch {
        return [];
    }
}

export function writeCart(items) {
    localStorage.setItem(KEY, JSON.stringify(items));
}

export function addToCart(product, qty = 1) {
    const cart = readCart();
    const i = cart.find((x) => x.productId === product.id);
    if (i) i.qty += qty;
    else cart.push({ productId: product.id, qty, product });
    writeCart(cart);
    return cart;
}

export function updateQty(productId, qty) {
    const cart = readCart()
        .map((x) => (x.productId === productId ? { ...x, qty } : x))
        .filter((x) => x.qty > 0);
    writeCart(cart);
    return cart;
}

export function removeFromCart(productId) {
    const cart = readCart().filter((x) => x.productId !== productId);
    writeCart(cart);
    return cart;
}
