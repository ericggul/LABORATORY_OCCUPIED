---
to: src/<%= h.changeCase.pascalCase(name) %>/styles.ts
---
import styled from 'styled-components';

export const Styled<%= h.changeCase.pascalCase(name) %> = styled.div`
    width: 100%;
    height: 100vh;
`;
