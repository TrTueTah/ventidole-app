import React from 'react';
import { components } from 'src/schemes/openapi';
import * as S from '../CommunityScreen.style';

type CommunityDetailDto = components['schemas']['CommunityDetailDto'];
type IdolInfo = components['schemas']['IdolInfo'];

interface AboutTabProps {
  community: CommunityDetailDto;
}

const AboutTab: React.FC<AboutTabProps> = ({ community }) => {
  return (
    <S.AboutContainer>
      {community.description && (
        <S.AboutSection>
          <S.AboutTitle>About</S.AboutTitle>
          <S.AboutText>{community.description}</S.AboutText>
        </S.AboutSection>
      )}

      {community.idols && community.idols.length > 0 && (
        <S.AboutSection>
          <S.AboutTitle>Artists ({community.idols.length})</S.AboutTitle>
          <S.IdolList>
            {community.idols.map((idol: IdolInfo) => (
              <S.IdolItem key={idol.id}>
                <S.IdolAvatar
                  source={{
                    uri: idol.avatarUrl || 'https://via.placeholder.com/60',
                  }}
                />
                <S.IdolName numberOfLines={2}>{idol.stageName}</S.IdolName>
              </S.IdolItem>
            ))}
          </S.IdolList>
        </S.AboutSection>
      )}

      <S.AboutSection>
        <S.AboutTitle>Community Stats</S.AboutTitle>
        <S.AboutText>
          {community.followerCount} {community.followerCount === 1 ? 'member' : 'members'}
        </S.AboutText>
        {community.createdAt && (
          <S.AboutText style={{ marginTop: 8 }}>
            Created on {new Date(community.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </S.AboutText>
        )}
      </S.AboutSection>
    </S.AboutContainer>
  );
};

export default AboutTab;
