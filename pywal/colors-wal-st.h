const char *colorname[] = {

  /* 8 normal colors */
  [0] = "#031013", /* black   */
  [1] = "#1C5952", /* red     */
  [2] = "#5E6553", /* green   */
  [3] = "#6C6D55", /* yellow  */
  [4] = "#807B65", /* blue    */
  [5] = "#6F846F", /* magenta */
  [6] = "#8C8B72", /* cyan    */
  [7] = "#89b4b1", /* white   */

  /* 8 bright colors */
  [8]  = "#5f7d7b",  /* black   */
  [9]  = "#1C5952",  /* red     */
  [10] = "#5E6553", /* green   */
  [11] = "#6C6D55", /* yellow  */
  [12] = "#807B65", /* blue    */
  [13] = "#6F846F", /* magenta */
  [14] = "#8C8B72", /* cyan    */
  [15] = "#89b4b1", /* white   */

  /* special colors */
  [256] = "#031013", /* background */
  [257] = "#89b4b1", /* foreground */
  [258] = "#89b4b1",     /* cursor */
};

/* Default colors (colorname index)
 * foreground, background, cursor */
 unsigned int defaultbg = 0;
 unsigned int defaultfg = 257;
 unsigned int defaultcs = 258;
