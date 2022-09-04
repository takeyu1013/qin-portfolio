import type { NextPage } from "next";

import { useState } from "react";
import {
  Center,
  Divider,
  LoadingOverlay,
  Stack,
  Textarea,
  TextInput,
  Title,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { useForm } from "@mantine/hooks";

import { Button, useMediaQuery } from "src/lib/mantine";

const initialValues = {
  email: "",
  name: "",
  message: "",
};

export type Contact = typeof initialValues;

const Contact: NextPage = () => {
  const { validate, reset, values, getInputProps } = useForm({
    initialValues,
    validationRules: {
      email: (value) => /^\S+@\S+$/.test(value),
    },
    errorMessages: {
      email: "Invalid email",
    },
  });
  const largerThanXs = useMediaQuery("sm");
  const { colorScheme } = useMantineColorScheme();
  const [visible, setVisible] = useState(false);
  const { colors } = useMantineTheme();

  return (
    <form
      className="flex justify-center"
      onSubmit={async (event) => {
        event.preventDefault();
        if (!validate()) {
          return;
        }
        setVisible(true);
        await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(values),
        });
        reset();
        setVisible(false);
      }}
    >
      <Stack
        px={16}
        py={40}
        className="max-w-5xl flex-grow"
        style={{ minHeight: largerThanXs ? 638 : 596 }}
      >
        <Title order={2}>Contact</Title>
        <Divider />
        <TextInput
          required
          label="Email"
          placeholder="your@email.com"
          {...getInputProps("email")}
        />
        <TextInput
          required
          label="Name"
          placeholder="Taro Yamada"
          {...getInputProps("name")}
        />
        <Textarea
          required
          label="Your message"
          placeholder="I want to order your goods"
          {...getInputProps("message")}
        />
        <Center>
          <Button
            type="submit"
            color="dark"
            variant={colorScheme === "dark" ? "white" : "filled"}
            radius="xl"
          >
            Send message
          </Button>
        </Center>
        <LoadingOverlay
          loaderProps={{ color: colors.pink[6] }}
          visible={visible}
        />
      </Stack>
    </form>
  );
};

export default Contact;
