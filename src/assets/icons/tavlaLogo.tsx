import React from 'react'
import { colors } from '@entur/tokens'

function TavlaLogo({ className, theme = 'dark' }: Props): JSX.Element {
    const fillColor = theme === 'dark' ? 'white' : colors.brand.blue
    return (
        <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 300 54"
        >
            <g fill="none" fillRule="evenodd">
                <path
                    fill={fillColor}
                    d="M2.25.25v29.264h21.131v-4.957H7.739V17.48h13.878v-4.957H7.739V5.207H23.38V.25z"
                />
                <path fill={colors.brand.coral} d="M2.2,43H54v-4.5H2.2V43z" />
                <path
                    fill={fillColor}
                    // eslint-disable-next-line max-len
                    d="M48.472.25v17.71L29.615.25h-.588v29.264h5.488v-17.39l18.859 17.39h.587V.25zM82.05 17.48h-8.193v24.306h-5.488V17.48h-8.234v-4.957h21.916zM98.712 42.306c-1.856 0-3.542-.294-5.057-.88-1.516-.586-2.81-1.412-3.881-2.479-1.072-1.065-1.902-2.358-2.49-3.877-.588-1.52-.882-3.212-.882-5.078v-17.47h5.489v17.47c0 1.466.235 2.679.705 3.638.47.96 1.052 1.72 1.745 2.279.692.56 1.437.947 2.235 1.16.797.213 1.51.32 2.136.32.628 0 1.34-.107 2.137-.32a5.998 5.998 0 0 0 2.235-1.16c.692-.56 1.274-1.32 1.744-2.279.471-.96.706-2.172.706-3.638v-17.47h5.489v17.47c0 1.866-.288 3.558-.863 5.078-.575 1.519-1.399 2.812-2.47 3.877-1.072 1.067-2.366 1.893-3.88 2.479-1.517.586-3.216.88-5.098.88M122.784 27.594h6.252c1.146 0 2.09-.147 2.832-.44.743-.293 1.33-.68 1.76-1.16.43-.48.722-1.019.878-1.619.157-.6.235-1.205.235-1.818 0-.72-.11-1.386-.332-2a4.288 4.288 0 0 0-1.017-1.599c-.455-.452-1.041-.812-1.758-1.08-.717-.265-1.582-.399-2.598-.399h-6.252v10.115zm0 4.877v9.315h-5.49V12.522h13.039c1.467 0 2.808.247 4.026.74 1.217.493 2.258 1.186 3.121 2.078.864.894 1.538 1.96 2.023 3.199.484 1.24.727 2.592.727 4.058 0 1.092-.145 2.152-.432 3.178a10.79 10.79 0 0 1-1.199 2.778 8.366 8.366 0 0 1-1.884 2.139 6.641 6.641 0 0 1-2.455 1.26l7.146 9.834h-6.547l-6.644-9.315h-5.431z"
                />
                <g
                    fill={colors.brand.coral}
                    fontFamily="Nationale-DemiBold, Nationale"
                    fontSize="40.5"
                    fontWeight="600"
                >
                    <text transform="translate(156 -5)">
                        <tspan x="0" y="46.518">
                            TAVLA
                        </tspan>
                    </text>
                </g>
            </g>
        </svg>
    )
}

interface Props {
    className?: string
    theme?: 'dark' | 'light'
    height?: number | string
    width?: number | string
}

export default TavlaLogo
