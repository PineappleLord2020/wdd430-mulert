import { AuthorsFilterPipe } from './authors-filter.pipe';

describe('AuthorsFilterPipe', () => {
  it('create an instance', () => {
    const pipe = new AuthorsFilterPipe();
    expect(pipe).toBeTruthy();
  });
});
