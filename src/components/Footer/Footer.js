import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';

import styles from './styles';
import Twitter from "../../assets/icons/twitter.png";
import Discord from "../../assets/icons/discord.png";
import Github from "../../assets/icons/github.png";

const useStyles = makeStyles(styles);

const Footer = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.root + classes.footerContainer + ` bg-background`} style={{color:"white"}}>
       <div className="flex flex-row items-center justify-center pt-20 space-x-4">
        <span className="text-white text-lg font-semibold">Docs</span>
        <span className="text-white text-lg font-semibold">Blog</span>
        <span className="text-white text-lg font-semibold">MediaKit</span>
      </div>
      <div className="flex flex-row items-center justify-center pb-8 pt-2 space-x-1">
        <img
          alt=""
          src={Twitter}
          className="w-16 h-16 object-scale-down cursor-pointer"
        />
        <img
          alt=""
          src={Discord}
          className="w-16 h-16 object-scale-down cursor-pointer"
        />
        <img
          alt=""
          src={Github}
          className="w-16 h-16 object-scale-down cursor-pointer"
        />
      </div>
      {/* <a
        href="https://yieldhubfinance.gitbook.io/yieldhub-docs/"
        target="_blank"
        rel="noopener noreferrer"
        className={classes.link}
      >
        <i className={`fas fa-book ${classes.linkIcon}`} />
        <span>{t('docs')}</span>
      </a>

      <a
        href="https://github.com/yieldhubfinance"
        target="_blank"
        rel="noopener noreferrer"
        className={classes.link}
      >
        <i className={`fab fa-github ${classes.linkIcon}`} />
        <span>{t('source')}</span>
      </a>

      <a
        href="https://twitter.com/yieldhubfinance"
        target="_blank"
        rel="noopener noreferrer"
        className={classes.link}
      >
        <i className={`fab fa-twitter ${classes.linkIcon}`} />

        <span>twitter</span>
      </a>
      <a
        href="https://discord.gg/gxYaW2C8cs"
        target="_blank"
        rel="noopener noreferrer"
        className={classes.link}
      >
        <i className={`fab fa-discord ${classes.linkIcon}`} />
        <span>discord</span>
      </a>
      <a
        href="https://medium.com/@yieldhubfinance"
        target="_blank"
        rel="noopener noreferrer"
        className={classes.link}
      >
        <i className={`fab fa-medium ${classes.linkIcon}`} />
        <span>medium</span>
      </a> */}
    </div>
  );
};

export default memo(Footer);
