import { CSSProperties } from 'vue';
import { TabBarGlassFilterState } from './useTabBarGlassFilter';

export function renderTabBarGlassLayers(layerClass: string, filter: TabBarGlassFilterState | null) {
  const filterStyle = filter
    ? ({ '--td-tab-bar-glass-filter': `url("#${filter.filterId}")` } as CSSProperties)
    : undefined;

  return [
    <span class={`${layerClass}-refraction`} style={filterStyle} aria-hidden="true" />,
    <span class={`${layerClass}-base`} aria-hidden="true" />,
    <span class={`${layerClass}-sheen`} aria-hidden="true" />,
    filter ? (
      <svg
        class={`${layerClass}-filter`}
        width="0"
        height="0"
        aria-hidden="true"
        focusable="false"
        style={{ position: 'absolute' }}
      >
        <defs>
          <filter
            id={filter.filterId}
            x={-filter.displacementScale}
            y={-filter.displacementScale}
            width={filter.width + filter.displacementScale * 2}
            height={filter.height + filter.displacementScale * 2}
            filterUnits="userSpaceOnUse"
            primitiveUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feGaussianBlur in="SourceGraphic" stdDeviation={filter.blur} result="blurred-source" />
            <feImage
              href={filter.displacementUrl}
              result="displacement-map"
              x="0"
              y="0"
              width={filter.width}
              height={filter.height}
              preserveAspectRatio="none"
            />
            <feDisplacementMap
              in="blurred-source"
              in2="displacement-map"
              scale={filter.displacementScale}
              xChannelSelector="R"
              yChannelSelector="G"
              result="refracted"
            />
            <feColorMatrix
              in="refracted"
              type="saturate"
              values={String(filter.specularSaturation)}
              result="refracted-saturated"
            />
            <feImage
              href={filter.specularUrl}
              result="specular-map"
              x="0"
              y="0"
              width={filter.width}
              height={filter.height}
              preserveAspectRatio="none"
            />
            <feComposite in="refracted-saturated" in2="specular-map" operator="in" result="masked-specular" />
            <feComponentTransfer in="specular-map" result="faded-specular">
              <feFuncA type="linear" slope={filter.specularOpacity} />
            </feComponentTransfer>
            <feBlend in="masked-specular" in2="refracted" mode="normal" result="refracted-highlight" />
            <feBlend in="faded-specular" in2="refracted-highlight" mode="screen" />
          </filter>
        </defs>
      </svg>
    ) : null,
  ];
}
