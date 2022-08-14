import type { NextPage } from "next";

import {
  Center,
  Divider,
  Stack,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { Button } from "src/lib/mantine";

const Contact: NextPage = () => {
  return (
    <Stack px={16} py={40}>
      <Title order={2}>Contact</Title>
      <Divider />
      <TextInput label="Email" placeholder="your@email.com" />
      <TextInput label="Name" placeholder="Taro Yamada" />
      <Textarea label="Your message" placeholder="I want to order your goods" />
      <Center>
        <Button color="dark" radius="xl">
          Send message
        </Button>
      </Center>
    </Stack>
  );
};

export default Contact;