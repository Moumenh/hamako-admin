import React from 'react'
import emotionStyled from '@emotion/styled'
export type As<Props = any> = React.ElementType<Props>

export type DOMElements = keyof JSX.IntrinsicElements

export declare type ComponentWithAs<Component extends As> = {
  (props: React.ComponentProps<Component>): JSX.Element;
  
};
export interface ChakraComponent<T extends As> extends ComponentWithAs<T> {
}

export declare type HTMLChakraComponents = {
  [Key in DOMElements]: ChakraComponent<Key>;
};

export function styled<T extends As>(
  component: T,
  options?: any,
) {
  const { baseStyle, ...styledOptions } = options ?? {}

  const Component = emotionStyled(
    component as React.ComponentType<any>,
    styledOptions,
  )({})

  const chakraComponent = React.forwardRef(function ChakraComponent(
    props,
    ref,
  ) {
    return React.createElement(Component, {
      ref,
      "data-theme": "data-theme",
      ...props,
    })
  })

  return chakraComponent as ChakraComponent<T>
}

function factory() {
  const cache = new Map<DOMElements, ChakraComponent<DOMElements>>()

  return new Proxy(styled, {
    /**
     * @example
     * const Div = chakra("div")
     * const WithChakra = chakra(AnotherComponent)
     */
    // apply(target, thisArg, argArray: [DOMElements, ChakraStyledOptions]) {
    //   return styled(...argArray)
    // },
    /**
     * @example
     * <chakra.div />
     */
    get(_, element: DOMElements) {
      if (!cache.has(element)) {
        cache.set(element, styled(element))
      }
      return cache.get(element)
    },
  }) as unknown as HTMLChakraComponents
}

export const chakra = factory()
