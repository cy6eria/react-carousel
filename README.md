# @cy6eria/react-carousel

The images carousel as a React component.

## Installation

```
npm install @cy6eria/react-carousel
```

## How to use

```
<Carousel className="carousel" onClose={handleClose}>
  {images.map((i) => <Image key={i} url={i} />)}
</Carousel>
```

| Property   | Optional | Type     | Default value | Description                                                                                                                                              |
|------------|----------|----------|---------------|----------------------------------------------------------------------------------------------------------------------------------------------------------|
| className  | Yes      | string   | -             | You can pass some styling through this property. This css classes will be used on the wrapper. You should use this property to set the wrapper sizes up. |
| onClose    | Yes      | function | -             | This handler will be called when user hit the close button. If this property is not defined then the close button won't be rendered.                     |
| components | Yes      | object   | -             | This object could be used to rewrite default components.                                                                                                 |
