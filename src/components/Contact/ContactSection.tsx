import React, { useState } from 'react';
import { ExternalLink, Copy, Check, Send, X } from 'lucide-react';
import { usePreferences } from '../../context/PreferencesContext';
import { Product, ProductVariant } from '../../types/product';
import { ContactConfig } from '../../types/config';
import { SectionHeader, Button } from '../common';
import { InstagramIcon, TikTokIcon, WhatsAppIcon } from './SocialLinks';
import { formatEGPPrice } from '../../utils/catalog';
import { buildProductInquiryMessage, getProductInquiryUrl } from '../../utils/inquiry';
import { assetUrl } from '../../utils/asset';

export interface ActiveInquiryState {
  product: Product;
  selectedVariant?: ProductVariant | null;
}

export interface ContactSectionProps {
  contactConfig: ContactConfig;
  activeInquiry: ActiveInquiryState | null;
  onClearInquiry: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  contactConfig,
  activeInquiry,
  onClearInquiry,
}) => {
  const { lang, isRTL, t, resolveText } = usePreferences();
  const [isCopied, setIsCopied] = useState(false);

  const instagramUrl =
    contactConfig.instagramUrl || 'https://www.instagram.com/caramel20261?rpxt=bmh0cmF5MmlpcWQ2';
  const tiktokUrl =
    contactConfig.tiktokUrl || 'https://www.tiktok.com/@caramel2226?_r=1&_t=ZS-9AZcTM4qbsv';
  const whatsappChannelUrl =
    contactConfig.whatsappChannelUrl || 'https://whatsapp.com/channel/0029VbBsrrB7oQhfGT7zsH0R';

  const isWhatsAppConfigured = Boolean(
    (contactConfig.whatsappNumber && contactConfig.whatsappNumber.trim() !== '') ||
    (contactConfig.whatsappDirectUrl && contactConfig.whatsappDirectUrl.trim() !== '')
  );

  const activeInquiryText = activeInquiry
    ? buildProductInquiryMessage({
        product: activeInquiry.product,
        selectedVariant: activeInquiry.selectedVariant,
        lang,
      })
    : '';

  const activeInquiryUrl = activeInquiry
    ? getProductInquiryUrl(
        {
          product: activeInquiry.product,
          selectedVariant: activeInquiry.selectedVariant,
          lang,
        },
        contactConfig.whatsappNumber,
        contactConfig.whatsappDirectUrl
      )
    : null;

  const handleCopyInquiry = async () => {
    if (!activeInquiryText) return;
    try {
      await navigator.clipboard.writeText(activeInquiryText);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = activeInquiryText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    }
  };

  const socialDestinations = [
    {
      id: 'instagram',
      name: 'Instagram',
      handle: '@caramel20261',
      description: isRTL ? 'إطلالات الموسم والقصص اليومية' : 'Seasonal looks & editorial stories',
      url: instagramUrl,
      icon: <InstagramIcon size={26} />,
      badgeColor: '#E1306C',
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      handle: '@caramel2226',
      description: isRTL ? 'فيديوهات التصميم وتنسيق القطع' : 'Runway clips & styling spotlights',
      url: tiktokUrl,
      icon: <TikTokIcon size={24} />,
      badgeColor: '#00F2FE',
    },
    {
      id: 'whatsapp-channel',
      name: isRTL ? 'قناة واتساب الرسمية' : 'WhatsApp VIP Channel',
      handle: isRTL ? 'إصدارات حصرية فورية' : 'Exclusive VIP releases',
      description: isRTL ? 'تنبيهات فورية بأحدث القطع والمجموعات' : 'Instant updates on private drops',
      url: whatsappChannelUrl,
      icon: <WhatsAppIcon size={26} />,
      badgeColor: '#25D366',
    },
  ];

  return (
    <section
      id="contact"
      style={{
        paddingBlock: 'var(--space-4xl)',
        scrollMarginTop: '88px',
        backgroundColor: 'var(--color-bg-primary)',
        borderBottom: '1px solid var(--color-border-subtle)',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div className="container" style={{ maxWidth: '1100px' }}>
        <SectionHeader
          eyebrow={isRTL ? 'القنوات الرسمية والتواصل' : 'Official Channels & Direct Inquiries'}
          title={isRTL ? 'تواصلي مع كاراميل' : 'Connect With Caramel'}
          subtitle={
            isRTL
              ? 'تابعي مجموعاتنا وإصداراتنا الحصرية عبر قنواتنا المعتمدة، أو تواصلي مباشرة للاستفسار عن أي قطعة.'
              : 'Explore our latest releases and private runway collections across our official verified destinations.'
          }
        />

        {/* 1. Active Product Inquiry Drawer (Only when an inquiry is initiated from a piece) */}
        {activeInquiry && (
          <div
            style={{
              backgroundColor: 'var(--color-bg-surface)',
              border: '1.5px solid var(--color-border-accent)',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--space-xl)',
              boxShadow: '0 16px 40px rgba(0, 0, 0, 0.45)',
              marginBottom: 'var(--space-3xl)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-md)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: 'var(--space-xs)',
                borderBottom: '1px solid var(--color-border-subtle)',
              }}
            >
              <span
                style={{
                  fontSize: 'var(--text-xs)',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                  color: 'var(--color-accent)',
                }}
              >
                {t.contact.activeInquiryTitle}
              </span>
              <button
                type="button"
                onClick={onClearInquiry}
                className="touch-target"
                style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--color-text-tertiary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  cursor: 'pointer',
                  background: 'none',
                  border: 'none',
                }}
                title={t.contact.clearInquiry}
              >
                <X size={15} />
                <span>{t.contact.clearInquiry}</span>
              </button>
            </div>

            {/* Selected Piece Info */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-md)',
                padding: 'var(--space-sm) var(--space-md)',
                backgroundColor: 'var(--color-bg-subtle)',
                borderRadius: 'var(--radius-sm)',
                textAlign: 'start',
              }}
            >
              <img
                src={assetUrl(
                  activeInquiry.selectedVariant?.primaryImage ||
                  activeInquiry.product.primaryImage
                )}
                alt={resolveText(activeInquiry.product.name)}
                style={{
                  width: '64px',
                  height: '80px',
                  objectFit: 'contain',
                  borderRadius: 'var(--radius-xs)',
                  backgroundColor: 'var(--color-product-surface)',
                }}
              />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '3px' }}>
                <h4 style={{ fontSize: 'var(--text-base)', fontWeight: 600, margin: 0 }}>
                  {resolveText(activeInquiry.product.name)}
                </h4>
                {activeInquiry.selectedVariant && (
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-accent)' }}>
                    <span>{t.contact.selectedColorLabel} </span>
                    <strong>{resolveText(activeInquiry.selectedVariant.colorName)}</strong>
                  </div>
                )}
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>
                  {formatEGPPrice(activeInquiry.product.price, lang)}
                </div>
              </div>
            </div>

            {/* Inquiry text draft */}
            <div
              style={{
                backgroundColor: 'var(--color-bg-base)',
                border: '1px solid var(--color-border-subtle)',
                borderRadius: 'var(--radius-sm)',
                padding: 'var(--space-sm) var(--space-md)',
                fontSize: 'var(--text-xs)',
                color: 'var(--color-text-primary)',
                textAlign: 'start',
                whiteSpace: 'pre-line',
                lineHeight: 'var(--leading-relaxed)',
              }}
            >
              {activeInquiryText}
            </div>

            {/* Actions */}
            <div
              style={{
                display: 'flex',
                gap: 'var(--space-sm)',
                flexWrap: 'wrap',
                justifyContent: 'flex-start',
              }}
            >
              <Button
                variant="outline"
                size="md"
                onClick={handleCopyInquiry}
                icon={isCopied ? <Check size={16} /> : <Copy size={16} />}
              >
                {isCopied ? t.contact.inquiryCopied : t.contact.copyInquiry}
              </Button>

              {isWhatsAppConfigured && activeInquiryUrl && (
                <Button
                  variant="primary"
                  size="md"
                  as="a"
                  href={activeInquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  icon={<Send size={16} />}
                  style={{
                    backgroundColor: 'var(--color-accent)',
                    color: 'var(--color-bg-primary)',
                  }}
                >
                  {t.contact.sendViaWhatsApp}
                </Button>
              )}
            </div>
          </div>
        )}

        {/* 2. THE SINGLE OFFICIAL SOCIAL DESTINATIONS GROUP */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'var(--space-lg)',
          }}
        >
          {socialDestinations.map((dest, index) => {
            const platformClass = dest.id === 'whatsapp-channel' ? 'is-whatsapp' : `is-${dest.id}`;
            return (
              <a
                key={dest.id}
                href={dest.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${dest.name} - ${dest.handle}`}
                className={`social-destination-card ${platformClass} reveal-on-scroll reveal-stagger-${index + 1} touch-target`}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}
                >
                  <div className="social-icon-wrapper">
                    {dest.icon}
                  </div>
                  <ExternalLink size={16} color="var(--color-accent)" />
                </div>

                <div>
                  <h3
                    style={{
                      fontSize: 'var(--text-lg)',
                      fontWeight: 600,
                      color: 'var(--color-text-primary)',
                      margin: '0 0 4px 0',
                    }}
                  >
                    {dest.name}
                  </h3>
                  <span
                    style={{
                      fontSize: 'var(--text-xs)',
                      color: 'var(--color-accent)',
                      fontWeight: 500,
                      letterSpacing: '0.04em',
                      display: 'block',
                      marginBottom: 'var(--space-2xs)',
                    }}
                  >
                    {dest.handle}
                  </span>
                  <p
                    style={{
                      fontSize: 'var(--text-xs)',
                      color: 'var(--color-text-secondary)',
                      margin: 0,
                      lineHeight: 'var(--leading-relaxed)',
                    }}
                  >
                    {dest.description}
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};
