
### Resize the SVG and Align Horizontally/ Vertically

1. Inside Inkscape, select File from the toolbar dropdown and select `Document properties`.
   
![image](https://github.com/canaleal/devicon-ui/assets/49886351/a837d718-01c2-4b31-a132-13625c8677cc)


2. Inside document properties change the `width` to 128.
3. Change the `height` to 128.

![image](https://github.com/canaleal/devicon-ui/assets/49886351/271af42a-6475-4876-84e4-781b5cc4cfd1)

3. To resize the SVG while maintaining the Aspect Ratio, press `ctrl-a` to select all paths.
4. Right click on the SVG and then select `group` from the dropdown.

![image](https://github.com/canaleal/devicon-ui/assets/49886351/44fe39b4-1fb6-4b41-b2a1-91d3b99e7942)


5. Click the lock icon in the toolbar.
6. Then select the largest of these 2 numbers (width or height) and change the value to 128. This will resize the icon to fit the viewbox. In the example below, the width was changed to 128.

![image](https://github.com/canaleal/devicon-ui/assets/49886351/09e4a071-a4d5-48d4-a1de-3ce9fe295bc0)

    
7. To align the SVG, open the align menu.
8. Then click the center horizontally button.
9. Then click the align vertically button.

![image](https://github.com/canaleal/devicon-ui/assets/49886351/d9b95a3b-a8e1-49c0-84ea-3c09257886af)


10. Right click on the SVG (Make sure all paths are selected using `ctrl-a`) and then select `ungroup` from the dropdown.

![image](https://github.com/canaleal/devicon-ui/assets/49886351/27666c30-947f-4f7a-b6ec-6cdb50128784)

12. You can now save the SVG.
13. Make sure to optimize the SVG prior to making a new PR. You can follow the steps below to optimize the SVG. 

### Unify the Paths (Inkscape)

1. Load the Icon inside inkscape and press `ctrl-a` to select all paths.
2. Right click on the SVG and select `ungroup` in the menu to ungroup all paths.

![image](https://github.com/canaleal/devicon-ui/assets/49886351/39853416-286d-487f-8f3d-7c65396e2a22)
   
3. Next, click the `Path` option at the top and in the the dropdown select `union` to combine all paths into 1 path.

![image](https://github.com/canaleal/devicon-ui/assets/49886351/219b80e9-c329-4853-b8e4-9f947447a43a)
   
4. You can now save the SVG.
5. Make sure to resize and optimize the SVG prior to making a new PR. You can follow the steps below to optimize the SVG. 


### Why Optimize the SVG (Inkscape)

1. After making the changes and saving the SVG, Inkscape will add a lot of new attributes inside the SVG. These attributes are used when you need to edit the SVGs inside inkscape, but are not required in Devicon and they should be removed.

![image](https://github.com/canaleal/devicon-ui/assets/49886351/ad79212f-b74c-482c-8589-8adde04b0875)


2. To remove the attributes from the SVG, use tools like SVGOMG or SVGViewer to optimize the SVG Code. I prefer using SVGOMG as you only need to select a few options to optimize the SVG.

### Optimizing using SVGOMG (Shout out to @BenSouchet)

1. Copy the full SVG code of the SVG you want to optimize.

![image](https://github.com/canaleal/devicon-ui/assets/49886351/59b640d5-b06d-434b-b3db-972f363e5f4b)
 
2. Go to [SVGOMG](https://jakearchibald.github.io/svgomg/), and on the left side click on `Paste markup`.

![image](https://github.com/canaleal/devicon-ui/assets/49886351/3eadc8cb-7daa-4976-8f21-1b28251b2a5b)

3. Paste the SVG code into the input box.

![image](https://github.com/canaleal/devicon-ui/assets/49886351/a76e687d-233b-47a9-b19e-cadd127413de)
   
4. Now that the SVG has been loaded in the interface, let's start optimizing the SVG using the `Features` menu.

![image](https://github.com/canaleal/devicon-ui/assets/49886351/ac093c5c-6c8a-40ad-ae0a-56ccea992f6e)


5. Disable `Compare gzipped`, enable `Multipass`, and do not touch the `precision slidebar`.

![image](https://github.com/canaleal/devicon-ui/assets/49886351/3111262f-2ca2-469e-b0ba-16a2dec92c9b)

6. Enable **ALL** the features **EXCEPT**:
- Remove xmlns
- Round/rewrite number lists
- Replace duplicate elements with links

![image](https://github.com/canaleal/devicon-ui/assets/49886351/7a6b83cd-8cec-4f74-8e75-8f95a85eb492)
![image](https://github.com/canaleal/devicon-ui/assets/49886351/35d09a87-9cbe-400e-a0b3-3afbe983a908)
![image](https://github.com/canaleal/devicon-ui/assets/49886351/d2545ce7-ef17-4d7b-9075-78a94d88ee47)

7. Click the copy button to copy the SVG code.

![image](https://github.com/canaleal/devicon-ui/assets/49886351/94043ddd-4e19-46ab-b73d-89ced82d4fd6)
 
8. Paste the SVG code inside your SVG file.
10. Add an empty newline at the end of file to ensure compatibility with older Devicon versions. 

![image](https://github.com/canaleal/devicon-ui/assets/49886351/e9a033a3-81db-4c63-89b9-acfc56c883cd)



