import {
    chakra,
    Box,
    Flex,
    SimpleGrid,
    GridItem,
    VisuallyHidden,
    Input,
    Button,
    Stack,
    Icon,
  } from "@chakra-ui/react";
  
  const Header = () => {
      return (
        <Box px={4} py={{base: 27, md: 28}} mx="auto">
          <Box
            w={{
              base: "full",
              md: 11 / 12,
              xl: 8 / 12,
            }}
            textAlign={{
              base: "left",
              md: "center",
            }}
            mx="auto"
          >
            <chakra.h1
              mb={3}
              fontSize={{
                base: "4xl",
                md: "5xl",
              }}
              fontWeight={{
                base: "bold",
                md: "extrabold",
              }}
              color="gray.700"
              _dark={{
                color: "gray.100",
              }}
              lineHeight="shorter"
            >
              Find all your favourite books
            </chakra.h1>
            <chakra.p
              mb={6}
              fontSize={{
                base: "lg",
                md: "xl",
              }}
              color="gray.500"
              lineHeight="base"
            >
              Search for books anywhere, you can search for books using the book name, author name, or publisher. Just enter keyword in the search and select search criteria.
            </chakra.p>
            <SimpleGrid
              as="form"
              w={{
                base: "full",
                md: 7 / 12,
              }}
              columns={{
                base: 1,
                lg: 6,
              }}
              spacing={3}
              pt={1}
              mx="auto"
              mb={8}
            >
              <GridItem
                as="label"
                colSpan={{
                  base: "auto",
                  lg: 4,
                }}
              >
                <VisuallyHidden>Your Email</VisuallyHidden>
                <Input
                  mt={0}
                  size="lg"
                  type="email"
                  placeholder="Enter your email..."
                  required
                />
              </GridItem>
              <Button
                as={GridItem}
                w="full"
                bg='orange.500'
                variant="solid"
                _hover={{
                    bg: 'orange.600'
                }}
                colSpan={{
                  base: "auto",
                  lg: 2,
                }}
                size="lg"
                type="submit"
                colorScheme="brand"
                cursor="pointer"
              >
                Get Started
              </Button>
            </SimpleGrid>
            <Stack
              display="flex"
              direction={{
                base: "column",
                md: "row",
              }}
              justifyContent={{
                base: "start",
                md: "center",
              }}
              mb={3}
              spacing={{
                base: 2,
                md: 8,
              }}
              fontSize="xs"
              color="gray.600"
            >
            </Stack>
          </Box>
        </Box>
      )
  }
  
  export default Header