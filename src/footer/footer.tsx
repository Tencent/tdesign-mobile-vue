import { defineComponent } from 'vue';
import TImage from '../image';
import FooterProps from './props';
import config from '../config';
import { usePrefixClass } from '../hooks/useClass';

const { prefix } = config;
const name = `${prefix}-footer`;
export default defineComponent({
  name,
  props: FooterProps,
  setup(props) {
    const footerClass = usePrefixClass('footer');
    const footerLinkClass = usePrefixClass('footer__link');

    const renderLogo = () => {
      const { logo } = props;
      if (!logo) {
        return;
      }

      return (
        <a class={`${footerClass.value}__logo`} href={logo.url} target={logo.target}>
          {logo.icon && <TImage class={`${footerClass.value}__icon`} src={logo.icon} />}
          {logo.title && <span class={`${footerClass.value}__title`}>{logo.title}</span>}
        </a>
      );
    };

    const renderText = () => {
      if (props.logo) {
        return;
      }

      return <div class={`${footerClass.value}__text`}>{props.text}</div>;
    };

    const renderLink = () => {
      const { links, logo } = props;
      const linksLength = links.length - 1;
      if (logo || linksLength < 0) {
        return;
      }

      return (
        <div class={`${footerLinkClass.value}-list`}>
          {links.map((link, index) => {
            return (
              <>
                <a href={link.url} target={link.target} class={`${footerLinkClass.value}-item`}>
                  {link.name}
                </a>
                {linksLength !== index && <div class={`${footerLinkClass.value}-line`}>|</div>}
              </>
            );
          })}
        </div>
      );
    };

    return () => {
      return (
        <div class={footerClass.value}>
          {renderLogo()}
          {renderLink()}
          {renderText()}
        </div>
      );
    };
  },
});
