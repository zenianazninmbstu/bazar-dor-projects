type Product = {
  id: number;
  nameBn: string;
  image: string;
  today: number;
  unit: string;
  change: {
    dir: "up" | "down";
    pct: number;
  };
};

type PriceTickerProps = {
  products: Product[];
};

export default function PriceTicker({ products }: PriceTickerProps) {
  return (
   <div className="overflow-hidden border-b py-2 w-screen relative left-1/2 -translate-x-1/2 border-gray-200">
      <div className="ticker-track">

        <div className="ticker-group">
          {products.map((product) => (
            <div key={product.id} className="ticker-item">
              {product.image} {product.nameBn} · {product.today} টাকা/
              {product.unit} ·{" "}
              <span
                className={
                  product.change.dir === "up"
                    ? "text-red-600"
                    : "text-green-600"
                }
              >
                {product.change.dir === "up" ? "▲" : "▼"}{" "}
                {product.change.pct}%
              </span>
            </div>
          ))}
        </div>

        <div className="ticker-group" aria-hidden="true">
          {products.map((product) => (
            <div key={product.id} className="ticker-item">
              {product.image} {product.nameBn} · {product.today} টাকা/
              {product.unit} ·{" "}
              <span
                className={
                  product.change.dir === "up"
                    ? "text-red-600"
                    : "text-green-600"
                }
              >
                {product.change.dir === "up" ? "▲" : "▼"}{" "}
                {product.change.pct}%
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}