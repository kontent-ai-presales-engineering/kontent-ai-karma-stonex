import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import React, { useEffect, useState } from "react";
import { useResizeDetector } from "react-resize-detector";
import { HubspotFormsCustomElement } from "../../components/custom-elements/hubspotforms";
import Head from "next/head";
import { ExportCustomElement } from "../../components/custom-elements/export";
import { CtaStyleCustomElement, StyleOption } from "../../components/custom-elements/cta-style";
import { HeadingLevelCustomElement, HeadingTag } from "../../components/custom-elements/heading-level";
import { FocalPointCustomElement } from "../../components/custom-elements/focal-point";
import { GetValueCustomElement } from "../../components/custom-elements/get-value";

interface IProps {
  elementComponent: string
}

const CustomElementIntegration: NextPage<IProps> = ({ elementComponent }) => {
  const [element, setElement] = useState<CustomElement.Element>()
  const [context, setContext] = useState<CustomElement.Context>()
  const [value, setValue] = useState<string>()

  if (process.browser) {
    document.body.style.background = "none transparent"
  }

  const { height, ref } = useResizeDetector();

  useEffect(() => {
    try {
      // CustomElement is coming from the script that is loaded in the Head
      // For more details, please review: https://kontent.ai/learn/docs/apis/custom-elements-js-api
      CustomElement?.init((initElement, initContext) => {
        setElement(initElement)
        setContext(initContext)
        setValue(initElement.value as string)
      })
    } catch (error: any) {
      console.error(error)
    }
  }, [])

  useEffect(() => {
    if (CustomElement && height as number > 0) {
      CustomElement.setHeight(Math.ceil(height as number) + 40)
    }
  }, [height])

  const handleSave = (newValue: string) => {
    setValue(newValue)
    CustomElement.setValue(newValue)
  }

  let renderElement = <div><p>There was an issue loading the Custom Element</p></div>
  if (element && context) {
    switch (elementComponent) {
      case "hubspotforms":
        renderElement = <HubspotFormsCustomElement element={element} context={context} handleSave={handleSave} value={value} />
        break;
      case "focal-point":
        renderElement =
          <FocalPointCustomElement element={element} context={context} handleSave={handleSave} value={value} />
        break;
      case "export":
        renderElement = <ExportCustomElement element={element} context={context} handleSave={handleSave} value={value} />
        break;
      case "cta-style":
        renderElement = <CtaStyleCustomElement element={element} context={context} handleSave={handleSave}
          value={value as StyleOption} />
        break;
      case "heading-level":
        renderElement = <HeadingLevelCustomElement element={element} context={context} handleSave={handleSave}
          value={value as HeadingTag} />
        break;
      case "get-value":
        renderElement = <GetValueCustomElement element={element} context={context} handleSave={handleSave} value={value} />
        break;
      default:
        renderElement = <div><p>Custom element no configured in code</p></div>
        break;
    }
  } else {
    renderElement = <div><p>The <code>Element</code> and/or <code>Context</code> is not loaded yet</p></div>
  }


  return (
    <>
      <Head>
        <script src="https://app.kontent.ai/js-api/custom-element/v1/custom-element.min.js"></script>
      </Head>
      <div>
        <div ref={ref}>
          {renderElement}
        </div>
      </div>
    </>)
}

export default CustomElementIntegration;

export const getStaticPaths: GetStaticPaths = async (params) => {
  return {
    paths: [
      '/ce/hubspotforms',
      '/ce/export',
      '/ce/focal-point',
      '/ce/read-only',
      '/ce/cta-style',
      '/ce/heading-level',
      '/ce/get-value',
    ],
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<IProps, NodeJS.Dict<string>> = async context => {
  const { element }: any = context.params

  return {
    props: {
      elementComponent: element
    }
  }
}