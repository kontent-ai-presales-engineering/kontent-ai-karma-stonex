import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import React, { useCallback, useEffect, useState } from "react";
import { useResizeDetector } from "react-resize-detector";
import { TranslationCustomElement } from "../../components/custom-elements/translation";
import { HubspotFormsCustomElement } from "../../components/custom-elements/hubspotforms";
import { FocalPointCustomElement } from "../../components/custom-elements/focal-point";
import Head from "next/head";
import { ExportCustomElement } from "../../components/custom-elements/export";
import { ReadOnlyCustomElement } from "../../components/custom-elements/read-only";
import { CtaStyleCustomElement, StyleOption } from "../../components/custom-elements/cta-style";
import { HeadingLevelCustomElement, HeadingTag } from "../../components/custom-elements/heading-level";

interface IProps {
  elementComponent: string
}

const CustomElementTest: NextPage<IProps> = ({ elementComponent }) => {
  const [element, setElement] = useState<CustomElement.Element>()
  const [context, setContext] = useState<CustomElement.Context>()
  const [value, setValue] = useState<string>()

  if (process.browser) {
    document.body.style.background = "none transparent"
  }

  const { height, ref } = useResizeDetector();

  useEffect(() => {
    try {
      CustomElement?.init((element, context) => {
        setElement(element)
        setContext(context)
        setValue(element.value as string)
      })
    } catch (error: any) {
      console.error(error)
    }
  }, [])

  useEffect(() => {
    if (CustomElement && height as number > 0) {
      CustomElement.setHeight(Math.ceil(height as number) + 15)
    }
  }, [height])

  const handleSave = (newValue: string) => {
    setValue(newValue)
    CustomElement.setValue(newValue)
  }

  let customElement = <div><p>There was an issue loading the Custom Element</p></div>
  if (element && context) {
    switch (elementComponent) {
      case "translation":
        customElement =
          <TranslationCustomElement element={element} handleSave={handleSave} value={value} context={context} />
        break;
      case "export":
        customElement = <ExportCustomElement element={element} context={context} handleSave={handleSave} value={value} />
        break;
      case "focal-point":
        customElement =
          <FocalPointCustomElement element={element} context={context} handleSave={handleSave} value={value} />
        break;
      case "hubspotforms":
        customElement =
          <HubspotFormsCustomElement element={element} context={context} handleSave={handleSave} value={value} />
        break;
      case "read-only":
        customElement = <ReadOnlyCustomElement value={value} />
        break;
      case "cta-style":
        customElement = <CtaStyleCustomElement element={element} context={context} handleSave={handleSave}
          value={value as StyleOption} />
        break;
      case "heading-level":
        customElement = <HeadingLevelCustomElement element={element} context={context} handleSave={handleSave}
          value={value as HeadingTag} />
        break;
      default:
        customElement = <div><p>Custom element no configured in code</p></div>
        break;
    }
  } else {
    customElement = <div><p>The <code>Element</code> and/or <code>Context</code> is not loaded yet</p></div>
  }


  return (
    <>
      <Head>
        <script src="https://app.kontent.ai/js-api/custom-element/v1/custom-element.min.js" async></script>
      </Head>
      <div>
        <div ref={ref}>
          {customElement}
        </div>
      </div>
    </>)
}

export default CustomElementTest;

export const getStaticPaths: GetStaticPaths = async (params) => {
  return {
    paths: [
      '/ce/translation',
      '/ce/hubspotforms',
      '/ce/export',
      '/ce/focal-point',
      '/ce/read-only',
      '/ce/cta-style',
      '/ce/heading-level',
    ],
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<IProps, NodeJS.Dict<string>> = async context => {
  const { element }: any = context.params

  return {
    props: {
      elementComponent: element,
    }
  }
}