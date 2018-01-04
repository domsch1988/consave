const char *colorname[] = {

  /* 8 normal colors */
  [0] = "#1e0b0f", /* black   */
  [1] = "#344854", /* red     */
  [2] = "#5E5656", /* green   */
  [3] = "#AB5842", /* yellow  */
  [4] = "#9F6858", /* blue    */
  [5] = "#AF8672", /* magenta */
  [6] = "#E49571", /* cyan    */
  [7] = "#98a3a1", /* white   */

  /* 8 bright colors */
  [8]  = "#6a7270",  /* black   */
  [9]  = "#344854",  /* red     */
  [10] = "#5E5656", /* green   */
  [11] = "#AB5842", /* yellow  */
  [12] = "#9F6858", /* blue    */
  [13] = "#AF8672", /* magenta */
  [14] = "#E49571", /* cyan    */
  [15] = "#98a3a1", /* white   */

  /* special colors */
  [256] = "#1e0b0f", /* background */
  [257] = "#98a3a1", /* foreground */
  [258] = "#98a3a1",     /* cursor */
};

/* Default colors (colorname index)
 * foreground, background, cursor */
 unsigned int defaultbg = 0;
 unsigned int defaultfg = 257;
 unsigned int defaultcs = 258;
