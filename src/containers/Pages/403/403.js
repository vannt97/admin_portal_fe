import React from 'react';
import { Link } from 'react-router-dom';
import Image from '@iso/assets/images/rob.png';
import IntlMessages from '@iso/components/utility/intlMessages';
import FourZeroFourStyleWrapper from './403.styles';

export default function() {
  return (
    <FourZeroFourStyleWrapper className="iso404Page">
      <div className="iso404Content">
        <h1>
          <IntlMessages id="page403.title" />
        </h1>
        <h3>
          <IntlMessages id="page403.subTitle" />
        </h3>
        <p>
          <IntlMessages id="page403.description" />
        </p>
        <Link to="/dashboard">
          <button type="button">
            <IntlMessages id="page403.backButton" />
          </button>
        </Link>
      </div>

      <div className="iso404Artwork">
        <img alt="#" src={Image} />
      </div>
    </FourZeroFourStyleWrapper>
  );
}
