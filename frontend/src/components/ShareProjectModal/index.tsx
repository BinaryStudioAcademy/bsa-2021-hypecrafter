/* eslint-disable react/require-default-props */
import { faClipboard } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import Clipboard from 'react-clipboard.js';
import {
  EmailIcon,
  EmailShareButton, FacebookIcon,
  FacebookShareButton,
  PinterestIcon,
  PinterestShareButton, TwitterIcon,
  TwitterShareButton
} from 'react-share';
import classes from './styles.module.scss';

interface ShareProjectModalProps {
  url?: string;
  imageUrl?: string;
  title: string;
}

const ShareProjectModal: FC<ShareProjectModalProps> = ({ url = 'https://google.com', imageUrl, title }) => {
  const [copied, setCopied] = useState(false);

  return (
    <Container>
      <Row className={classes['social-links-container']}>
        <FacebookShareButton url={url}>
          <FacebookIcon size={36} borderRadius={4} />
        </FacebookShareButton>
        <TwitterShareButton url={url} title={title}>
          <TwitterIcon size={36} borderRadius={4} />
        </TwitterShareButton>
        <PinterestShareButton url={url} media={imageUrl ?? 'https://source.unsplash.com/random'}>
          <PinterestIcon size={36} borderRadius={4} />
        </PinterestShareButton>
        <EmailShareButton url={url} subject={title}>
          <EmailIcon size={36} borderRadius={4} />
        </EmailShareButton>
      </Row>

      <Row className={classes['clipboard-container']}>
        <Clipboard data-clipboard-text={url} className={classes.clipboard} onClick={() => setCopied(true)}>
          <span>{url}</span>
          <FontAwesomeIcon icon={faClipboard} className={classes['clipboard-icon']} />
        </Clipboard>
        {copied && <div className={classes['copied-message']}>Copied!</div>}
      </Row>
    </Container>
  );
};

export default ShareProjectModal;

