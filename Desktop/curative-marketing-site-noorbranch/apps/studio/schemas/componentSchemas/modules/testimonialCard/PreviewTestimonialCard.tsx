import { studioApiVersion } from '@/lib';
import { Box, Card, Stack, Text } from '@sanity/ui';
import { useEffect, useState } from 'react';
import { type PreviewProps, type SanityClient, type TypedObject, useClient } from 'sanity';
import { blockPreview } from 'sanity-pills';

interface PreviewTestimonialCardProps extends PreviewProps {
  theme?: string;
  testimonial?: {
    _ref: string;
  };
}

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

export const PreviewTestimonialCard = (props: PreviewTestimonialCardProps) => {
  const [testimonialPayload, setTestimonialPayload] = useState<TestimonialWithAuthorName | undefined>();
  const { renderDefault, theme, testimonial } = props;
  const componentName = typeof props.schemaType === 'object' ? props.schemaType.name : props.schemaType;
  const client = useClient({
    apiVersion: studioApiVersion,
  });

  useEffect(() => {
    const testimonialRef = testimonial?._ref;

    if (!testimonialRef) return undefined;

    fetchTestimonialPayloads(client, testimonialRef, setTestimonialPayload);
  }, [client, testimonial?._ref]);

  const nothingToPreview = !theme && !testimonial;

  if (nothingToPreview) {
    return renderDefault(props);
  }

  return (
    <Box>
      <Box>
      {renderDefault({ ...props, title: 'Testimonial Card', subtitle: null })}
      </Box>
      {testimonialPayload?.body && (
        <Box marginTop={3}>
          <Card padding={3} radius={2} shadow={1} tone="default">
            <Stack space={3}>
              {blockPreview(testimonialPayload.body)}
              {testimonialPayload.attribution && (
                <Text size={1} muted>
                  - {testimonialPayload.attribution}
                </Text>
              )}
            </Stack>
          </Card>
        </Box>
      )}
    </Box>
  );
};
