import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  height: 20px;
  line-height: 20px;
  margin-bottom: 10px;
  font-size: 13px;
  color: #666;
  text-align: center;
`;

const Disclaimer = () => {
  return <Container>This app is for educational purposes only </Container>;
};

export default Disclaimer;