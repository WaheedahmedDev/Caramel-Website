import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { Product, ProductCategory, ProductVariant } from '../../types/product';
import { contactConfig } from '../../config/contact';
import { usePreferences } from '../../context/PreferencesContext';
import { getActiveProducts, filterProductsByCategory } from '../../utils/catalog';
import { SectionHeader, Button, EmptyState } from '../common';
import { ProductCard } from '../ProductCard';

export interface ProductCollectionProps {
  products: Product[];
  activeCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  onInspectProduct?: (product: Product, initialVariantId?: string | null) => void;
  onInquireProduct?: (product: Product, selectedVariant?: ProductVariant | null) => void;
  className?: string;
}

export const ProductCollection: React.FC<ProductCollectionProps> = ({
  products,
  activeCategory,
  onSelectCategory,
  onInspectProduct,
  onInquireProduct,
  className = '',
}) => {
  const { t } = usePreferences();

  // 1. Filter products based on catalogue mode
  const activeProducts = getActiveProducts(products, contactConfig.catalogMode);

  // 2. Filter by active category
  const filteredProducts = filterProductsByCategory(activeProducts, activeCategory);

  // 3. Calculate category item counts dynamically from active catalogue
  const counts: Record<ProductCategory, number> = {
    all: activeProducts.length,
    handbags: activeProducts.filter((p) => p.category === 'handbags').length,
    apparel: activeProducts.filter((p) => p.category === 'apparel').length,
    accessories: activeProducts.filter((p) => p.category === 'accessories').length,
  };

  const categories: Array<{ id: ProductCategory; label: string }> = [
    { id: 'all', label: `${t.collection.all} (${counts.all})` },
    { id: 'handbags', label: `${t.collection.handbags} (${counts.handbags})` },
    { id: 'apparel', label: `${t.collection.apparel} (${counts.apparel})` },
    { id: 'accessories', label: `${t.collection.accessories} (${counts.accessories})` },
  ];

  return (
    <section
      id="collection"
      className={`collection-section ${className}`}
      style={{
        paddingBlock: 'var(--space-4xl)',
        borderBottom: '1px solid var(--color-border-subtle)',
        backgroundColor: 'var(--color-bg-base)',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div className="container">
        {/* Section Heading */}
        <div className="reveal-on-scroll">
          <SectionHeader
            eyebrow={t.collection.eyebrow}
            title={t.collection.title}
            subtitle={t.collection.subtitle}
          />
        </div>

        {/* Category Filter Chips */}
        <div
          role="tablist"
          aria-label={t.collection.title}
          className="reveal-on-scroll reveal-stagger-1"
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 'var(--space-xs)',
            flexWrap: 'wrap',
            marginBottom: 'var(--space-3xl)',
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              role="tab"
              aria-selected={activeCategory === cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`chip touch-target ${activeCategory === cat.id ? 'chip-active' : ''}`}
              style={{
                borderRadius: 'var(--radius-pill)',
                padding: '8px 20px',
                fontSize: 'var(--text-xs)',
                fontWeight: 600,
                letterSpacing: '0.04em',
                transition: 'all var(--transition-fast)',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Data-driven collection grid or honest empty state */}
        {filteredProducts.length > 0 ? (
          <div className="showroom-grid">
            {filteredProducts.map((product, idx) => (
              <ProductCard
                key={product.id}
                product={product}
                index={idx}
                onInspect={onInspectProduct}
                onInquire={onInquireProduct}
              />
            ))}
          </div>
        ) : (
          <div style={{ paddingBlock: 'var(--space-xl)' }}>
            <EmptyState
              icon={<ShieldCheck size={32} strokeWidth={1.5} />}
              title={t.collection.emptyTitle}
              description={t.collection.emptyDescription}
              action={
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onSelectCategory('all')}
                >
                  {t.collection.showAll}
                </Button>
              }
            />
          </div>
        )}
      </div>
    </section>
  );
};
