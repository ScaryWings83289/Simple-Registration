import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 10px 0px;
  background-color: #39a6a3;

  @media screen and (max-width: 800px) {
    padding: 10px 0px;
  }
`;

export const LogoContainer = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 180px;
  padding-left: 20px;

  img {
    width: 180px;
    height: 70px;
  }

  @media screen and (max-width: 800px) {
    padding: 0;
    width: 120px;

    img {
      width: 110px;
      height: 50px;
    }
  }
`;

export const OptionsContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 20px;

  @media screen and (max-width: 800px) {
    width: 80%;
    padding-right: 5px;
  }
`;

export const OptionLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
  color: #ffffff;
  font-size: 17px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-decoration: none;

  @media screen and (max-width: 800px) {
    font-size: 13px;
    padding: 5px;
  }
`;