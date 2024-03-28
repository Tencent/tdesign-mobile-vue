import { GuideStep } from './type';

export type GuideCrossProps = Pick<
  GuideStep,
  'mode' | 'skipButtonProps' | 'nextButtonProps' | 'backButtonProps' | 'showOverlay' | 'highlightPadding'
>;

export interface ContentProps {
  handleNext: (e: MouseEvent) => void;
  handleSkip: (e: MouseEvent) => void;
  handleBack: (e: MouseEvent) => void;
  handleFinish: (e: MouseEvent) => void;
  current: number;
  total: number;
}
