import React from 'react';
import ScreenTitle from '../../../components/ScreenTitle';
import CouponItem from './CouponItem';
import NoCoupon from './NoCoupon';

function MyCoupon({data}) {
  return (
    <>
      <ScreenTitle title="My Coupons" />
      {data.length !== 0 ? (
        data.map((d) => (
          <CouponItem
            key={d.id}
            code={d.code}
            title={d.title}
            description={d.description}
          />
        ))
      ) : (
        <NoCoupon />
      )}
    </>
  );
}

export default MyCoupon;
