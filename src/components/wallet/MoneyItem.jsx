import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Container, MoneyBtn, MoneyQuantity } from 'components/wallet/MoneyItem.style';
import { addCommasToNumber } from 'utils/util';
import { TIME_TO_SELCT_PRODUCT } from 'constant/constant';
import useVMState from 'hooks/useVMState';
import { FinalPayContext, FinalPaySetContext } from 'contexts/FinalPayProvider';
import { HistoryDispatchContext } from 'contexts/HistoryProvider';

export default function QuantityBtnWrap({ info, coin, decreaseQuantity }) {
  const [finalPay, setFinalPay] = [useContext(FinalPayContext), useContext(FinalPaySetContext)];
  const { addInputHistory } = useContext(HistoryDispatchContext);
  const { returnPay } = useVMState();

  const handleClickQuantityBtn = () => {
    const totalPay = finalPay + info.unit;
    decreaseQuantity(info.id);
    setFinalPay(totalPay);
    addInputHistory(totalPay);
    returnPay(totalPay, TIME_TO_SELCT_PRODUCT);
  };

  return (
    <Container>
      <MoneyBtn color={info.color} coin={coin} onClick={handleClickQuantityBtn} disabled={info.quantity <= 0}>
        {addCommasToNumber(info.unit)}
      </MoneyBtn>
      <MoneyQuantity>{info.quantity}</MoneyQuantity>
    </Container>
  );
}

QuantityBtnWrap.propTypes = {
  info: PropTypes.shape({
    id: PropTypes.number,
    unit: PropTypes.number,
    quantity: PropTypes.number,
    color: PropTypes.string
  }),
  coin: PropTypes.bool,
  decreaseQuantity: PropTypes.func
};

QuantityBtnWrap.defaultProps = {
  info: {
    id: null,
    unit: 0,
    quantity: 0,
    color: '#fff'
  },
  coin: false,
  decreaseQuantity: () => {}
};
