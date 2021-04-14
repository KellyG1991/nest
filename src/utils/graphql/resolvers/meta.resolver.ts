import { Resolver, ResolveField } from '@nestjs/graphql';

@Resolver('Meta')
export class MetaResolver {
    @ResolveField()
    __resolveType(value: any) {
        switch (value.type) {
            case 'pagination':
                return 'Pagination';
        }

        return null;
    }
}
