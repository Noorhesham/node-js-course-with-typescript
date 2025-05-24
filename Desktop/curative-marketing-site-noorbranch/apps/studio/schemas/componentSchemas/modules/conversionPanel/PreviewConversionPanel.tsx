import { studioApiVersion } from '@/lib';
import { Badge, Box, Card, Flex, Stack, Text } from '@sanity/ui';
import { useTheme_v2 } from '@sanity/ui';
import { namedColors } from '@/lib/consts';
import { useEffect, useState } from 'react';
import { type PreviewProps, type SanityClient, type TypedObject, useClient } from 'sanity';
import { blockPreview } from 'sanity-pills';

interface PreviewConversionPanelProps extends PreviewProps {
  heading?: string;
  subhead?: string;
  testimonialReference?: {
    _ref: string;
  };
  variant?: string;
  theme?: string;
  image?: any;
  ctaBar?: {
    ctas?: Array<{
      _type: string;
      buttonText: string;
      buttonStyle?: string;
      buttonSize?: string;
    }>;
  };
}

interface CtaInfo {
  text: string;
  isShared: boolean;
}

const fetchSharedCtaText = async (client: SanityClient, ref: string) => {
  const cta = await client.fetch(
    `*[_id == $ref][0]{ buttonText }`,
    { ref }
  );
  return cta?.buttonText;
};

const extractCtaTitles = async (client: SanityClient, ctaBar: any) => {
  console.log('extractCtaTitles ctaBar:', ctaBar);
  const ctaInfos: CtaInfo[] = [];
  
  if (ctaBar?.ctas) {
    for (const cta of ctaBar.ctas) {
      if (cta._type === 'localCta') {
        ctaInfos.push({ text: cta.buttonText, isShared: false });
      } else if (cta._type === 'reference') {
        const sharedText = await fetchSharedCtaText(client, cta._ref);
        ctaInfos.push({ text: sharedText || 'Loading...', isShared: true });
      }
    }
  }

  return ctaInfos;
};

type TestimonialPayload = {
  body?: TypedObject[];
  author?: {
    _ref: string;
  };
  attributionDetails?: string;
};

type TestimonialWithAuthorName = TestimonialPayload & {
  attribution?: string;
};

const fetchAuthorName = async (
  client: SanityClient,
  authorRef: string | undefined,
) => {
  if (!authorRef) return undefined;

  const author = await client.fetch('*[_id == $authorRef][0]', {
    authorRef,
  });

  if (!author) return undefined;

  return [author.firstName, author.lastName].filter(Boolean).join(' ');
};

const fetchTestimonialPayloads = async (
  client: SanityClient,
  testimonialRef: string,
  setter: (payload: TestimonialWithAuthorName | undefined) => void,
) => {
  const testimonial = await client.fetch<TestimonialPayload>(
    '*[_id == $ref][0]',
    { ref: testimonialRef },
  );
  if (!testimonial) {
    setter(undefined);
    return;
  }
  let attribution = testimonial.attributionDetails;
  if (!attribution) {
    attribution = await fetchAuthorName(client, testimonial.author?._ref);
  }
  setter({ ...testimonial, attribution });
};

export const PreviewConversionPanel = (props: PreviewConversionPanelProps) => {
  console.log('PreviewConversionPanel props:', props);
  const [testimonialPayload, setTestimonialPayload] = useState<TestimonialWithAuthorName | undefined>();
  const [ctaTitles, setCtaTitles] = useState<CtaInfo[]>([]);
  const { renderDefault, heading, subhead, testimonialReference, variant, theme, image, ctaBar } = props;
  const componentName = typeof props.schemaType === 'object' ? props.schemaType.name : props.schemaType;
  const client = useClient({
    apiVersion: studioApiVersion,
  });
  const theme_v2 = useTheme_v2();
  const isDarkMode = theme_v2.color._dark;
  const sharedBorderColor = namedColors[isDarkMode ? 'dark' : 'light'].sharedComponent.border;

  useEffect(() => {
    const testimonialRef = testimonialReference?._ref;

    if (!testimonialRef) return undefined;

    fetchTestimonialPayloads(client, testimonialRef, setTestimonialPayload);
  }, [client, testimonialReference?._ref]);

  useEffect(() => {
    console.log('useEffect ctaBar:', ctaBar);
    if (ctaBar) {
      extractCtaTitles(client, ctaBar).then(titles => {
        console.log('Extracted titles:', titles);
        setCtaTitles(titles);
      });
    }
  }, [client, ctaBar]);

  const nothingToPreview = !heading && !subhead && !testimonialReference && !image && !theme && !ctaBar?.ctas?.length;

  if (nothingToPreview) {
    return renderDefault(props);
  }

  return (
    <Box>
      <Box>
        {renderDefault({ ...props, title: 'Conversion Panel', subtitle: null })}
      </Box>
      <Box marginTop={3}>
        <Card padding={3} radius={2} shadow={1} tone="default">
          <Stack space={3}>
            {variant === 'clientStory' && testimonialPayload?.body && (
              <Stack space={3}>
                {blockPreview(testimonialPayload.body)}
                {testimonialPayload.attribution && (
                  <Text size={1} muted>
                    - {testimonialPayload.attribution}
                  </Text>
                )}
              </Stack>
            )}
            {(['downloadableAsset', 'brand', 'internal'].includes(variant || '')) && (
              <Stack space={2}>
                {heading && <Text weight="medium">{heading}</Text>}
                {subhead && <Text size={1}>{subhead}</Text>}
                {variant && (
                  <Text size={1} muted>
                    {variant}
                  </Text>
                )}
              </Stack>
            )}
            <Box style={{ borderTop: '1px solid var(--card-border-color)' }} marginY={3} />
            <Stack space={2}>
              {ctaTitles.length > 0 ? (
                <Flex gap={2} wrap="wrap">
                  {ctaTitles.map((cta, index) => (
                    <Badge padding={2} key={index} tone={cta.isShared ? undefined : 'default'} style={cta.isShared ? {
                      backgroundColor: 'transparent',
                      border: `1px solid ${sharedBorderColor}`
                    } : undefined}>
                      {cta.isShared ? (
                        <span style={{ color: sharedBorderColor }}>{cta.text}</span>
                      ) : cta.text}
                    </Badge>
                  ))}
                </Flex>
              ) : (
                <Text size={1} muted>No CTAs</Text>
              )}
            </Stack>
          </Stack>
        </Card>
      </Box>
    </Box>
  );
};
