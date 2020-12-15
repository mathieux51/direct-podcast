import React from 'react'

const MicSVGVolume = ({ className, viewBox = '0 0 59 79', instant }) => {
  const opacity1 = instant > 0 ? 1 : 0.5
  const opacity2 = instant > 42.5 ? 1 : 0.5
  const opacity3 = instant > 85 ? 1 : 0.5
  const opacity4 = instant > 127.5 ? 1 : 0.5
  const opacity5 = instant > 170 ? 1 : 0.5
  const opacity6 = instant > 212.5 ? 1 : 0.5
  return (
    <svg width='100%' viewBox={viewBox} className={className}>
      <defs>
        <path
          d='M29.1666667,50 C36.0833333,50 41.625,44.4166667 41.625,37.5 L41.6666667,12.5 C41.6666667,5.58333333 36.0833333,0 29.1666667,0 C22.25,0 16.6666667,5.58333333 16.6666667,12.5 L16.6666667,37.5 C16.6666667,44.4166667 22.25,50 29.1666667,50 Z M51.25,37.5 C51.25,50 40.6666667,58.75 29.1666667,58.75 C17.6666667,58.75 7.08333333,50 7.08333333,37.5 L0,37.5 C0,51.7083333 11.3333333,63.4583333 25,65.5 L25,79.1666667 L33.3333333,79.1666667 L33.3333333,65.5 C47,63.5 58.3333333,51.75 58.3333333,37.5 L51.25,37.5 Z'
          id='path-1'
        />
      </defs>
      <g
        id='Page-1'
        stroke='none'
        strokeWidth='1'
        fill='none'
        fillRule='evenodd'
      >
        <g id='record'>
          <mask id='mask-2' fill='white'>
            <use xlinkHref='#path-1' />
          </mask>
          <use
            id='Shape'
            fill='#000000'
            fillRule='nonzero'
            xlinkHref='#path-1'
          />
          <rect
            opacity={opacity1}
            id='vol1'
            fill='#6DD400'
            mask='url(#mask-2)'
            x='-11'
            y='66'
            width='80'
            height='13'
          />
          <rect
            opacity={opacity2}
            id='vol2'
            fill='#6DD400'
            mask='url(#mask-2)'
            x='-11'
            y='52'
            width='80'
            height='13'
          />
          <rect
            opacity={opacity3}
            id='vol3'
            fill='#F8CA12'
            mask='url(#mask-2)'
            x='-11'
            y='37'
            width='80'
            height='14'
          />
          <rect
            opacity={opacity4}
            id='vol4'
            fill='#F8CA12'
            mask='url(#mask-2)'
            x='-11'
            y='24'
            width='80'
            height='12'
          />
          <rect
            opacity={opacity5}
            id='vol5'
            fill='#FA6400'
            mask='url(#mask-2)'
            x='-10'
            y='11'
            width='80'
            height='12'
          />
          <rect
            opacity={opacity6}
            id='vol6'
            fill='#E02020'
            mask='url(#mask-2)'
            x='-11'
            y='-3'
            width='80'
            height='13'
          />
        </g>
      </g>
    </svg>
  )
}

export default MicSVGVolume
