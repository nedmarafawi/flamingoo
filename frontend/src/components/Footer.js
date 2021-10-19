import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

export const Footer = () => {
  const handleClickScroll = () => {
    window.scrollTo(0, 0);
  };

  return (
    <FooterContainer>
      <FooterWrap>
        <FooterLinksContainer>
          <FooterLinksWrapper>
            {/* <FooterLinkItems>
              <FooterLinkTitle>My Account</FooterLinkTitle>
              <FooterLinkProfile to="/settings">Profile</FooterLinkProfile>
            </FooterLinkItems> */}
            <FooterLinkItems>
              <FooterLinkTitle>Social Media</FooterLinkTitle>
              <FooterLink
                href="https://www.instagram.com/flamingoo_site/"
                target="_blank"
              >
                Instagram
              </FooterLink>
              <FooterLink
                href="https://twitter.com/FlaminGoo_site"
                target="_blank"
              >
                Twitter
              </FooterLink>
              <FooterLink
                href="https://www.facebook.com/FlaminGoo-108666428255901"
                target="_blank"
              >
                Facebook
              </FooterLink>
            </FooterLinkItems>
          </FooterLinksWrapper>
        </FooterLinksContainer>
        <Media>
          <MediaWrap>
            <Logo onClick={handleClickScroll} to="/">
              <i class="fas fa-kiwi-bird"></i>
              &nbsp; FlaminGoo<span style={{ color: 'gray' }}></span>
            </Logo>
            <CopyRight>
              Copyright © {new Date().getFullYear()}. All Rights Reserved{' '}
            </CopyRight>
            <Icons>
              <IconLink
                href="https://www.facebook.com/FlaminGoo-108666428255901"
                target="_blank"
              >
                <FaFacebook />
              </IconLink>
              <IconLink
                href="https://www.instagram.com/flamingoo_site/"
                target="_blank"
              >
                <FaInstagram />
              </IconLink>
              <IconLink
                href="https://twitter.com/FlaminGoo_site"
                target="_blank"
              >
                <FaTwitter />
              </IconLink>
            </Icons>
          </MediaWrap>
        </Media>
      </FooterWrap>
    </FooterContainer>
  );
};

const FooterContainer = styled.div`
  background-color: #454e51;
  color: #fff;
  position: relative;
  min-height: 100%;
  left: 0;
  right: 0;
`;
// min-height: 25vh;
// top: 450%;

const FooterWrap = styled.div`
  padding: 48px 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 1100px;
  margin: 0 auto;
  margin-top: 200px;
`;

const FooterLinksContainer = styled.div`
  display: flex;
  justify-content: center;
  @media screen and (max-width: 820px) {
    padding-top: 32px;
  }
`;

const FooterLinksWrapper = styled.div`
  display: flex;
  @media screen and (max-width: 820px) {
    flex-direction: column;
  }
`;

const FooterLinkItems = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 16px;
  text-align: left;
  width: 160px;
  box-sizing: border-box;
  font-family: var(--heading-font-family);
  @media screen and (max-width: 420px) {
    margin: 0;
    padding: 10px;
    width: 100%;
  }
`;

const FooterLinkTitle = styled.h1`
  font-size: 14px;
  margin-bottom: 16px;
`;

const FooterLink = styled.a`
  text-decoration: none;
  margin-bottom: 0.5rem;
  font-size: 14px;
  color: #fff;
  transition: 0.3s ease-out;
  &:hover {
    color: gray;
  }
`;

const FooterLinkProfile = styled.div`
  text-decoration: none;
  margin-bottom: 0.5rem;
  font-size: 14px;
  color: #fff;
  transition: 0.3s ease-out;
  &:hover {
    color: gray;
    cursor: pointer;
  }
`;

const Media = styled.section`
  max-width: 1100px;
  width: 100%;
`;

const MediaWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1100px;
  margin: 40px auto 0 auto;
  @media screen and (max-width: 820px) {
    flex-direction: column;
  }
`;

const Logo = styled(Link)`
  color: #fff;
  justify-self: start;
  cursor: pointer;
  text-decoration: none;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  font-weight: bold;
  font-family: var(--heading-font-family);
`;

const CopyRight = styled.small`
  color: #fff;
  margin-bottom: 16px;
  font-family: var(--heading-font-family);
  line-height: 2;
`;

const Icons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 120px;
`;

const IconLink = styled.a`
  color: #fff;
  font-size: 24px;
  transition: 0.3s ease-out;
  &:hover {
    color: gray;
  }
`;
