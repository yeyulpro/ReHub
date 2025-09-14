using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Core
{
    public class PaginationParams<TCursor>
    {
        private const int MaxPageSize = 50;
        public TCursor? Cursor { get; set; }

        private int _pageSize = 3;
        public int PageSize
        {
            get => _pageSize;

            set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
        }

    }
}