import { Style } from 'global/StyleProvider';

export default class AssessmentsPageStyle extends Style {

  get cols() {
    return 48;
  }

  get separatorCols(){
    return this.styleProvider.select({
      phone: 2,
      tablet: 16,
      desktop: 24,
    });
  }

  get buttonCols(){
    return this.styleProvider.select({
      phone: 23,
      tablet: 16,
      desktop: 12,
    });
  }

  get gridList() {
    return {width: '100%'}
  }

  get AssessmentsGrid() {
    return this.overwrite({
      columns: this.styleProvider.select({
        phone: 1,
        tablet: 2,
        desktop: 3,
      }),
      allowMore: this.styleProvider.select({
        phone: false,
        desktop: true,
      }),
      cellHeight: this.styleProvider.select({
        desktop: '100px',
      }),
      AssessmentTile: {
        cellHeight: this.styleProvider.select({
          desktop: 2 * this.baseLineHeight,
        }),
      }
    });
  }

  get navigationButton() {
    return {
      text: this.styleProvider.select({
        phone: false,
        desktop: true,
      }),
      labelStyle: {
        fontSize: this.styleProvider.select({
          phone: '50%',
          desktop: '90%',
        }),
        margin: this.styleProvider.select({
          phone: `${this.baseFontsize / 2}`,
        }),
      },
    }
  }
}
