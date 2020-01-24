<aside class="main-sidebar">

    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">

        <!-- Sidebar user panel (optional) -->
        <div class="user-panel">
            <div class="pull-left image">
                <img src="{{asset('dist/img/avatar5.png')}}" class="img-circle" alt="User Image">
            </div>
            <div class="pull-left info">
                <p> {{ Auth::user()->name }}</p>
                <!-- Status -->
                <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
            </div>
        </div>

        <!-- search form (Optional) -->
        <form action="#" method="get" class="sidebar-form">
            <div class="input-group">
                <input type="text" name="q" class="form-control" placeholder="Search...">
                <span class="input-group-btn">
              <button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i>
              </button>
            </span>
            </div>
        </form>
        <!-- /.search form -->

        <!-- Sidebar Menu -->
        <ul class="sidebar-menu" data-widget="tree">
            <li class="header">
                <marquee behavior="scroll" direction="left"  >
                    WELCOME TO INSURANCE POLICY MANAGER
                </marquee>
            </li>
            <!-- Optionally, you can add icons to the links -->
            <li class="active"><a href="{{url('home')}}"><i class="fa fa-dashboard"></i> <span>Dashboard</span></a></li>

            <li class="treeview">
                <a href="#"><i class="fa fa-money"></i> <span>Sales</span>
                    <span class="pull-right-container">
                <i class="fa fa-angle-left pull-right"></i>
              </span>
                </a>
                <ul class="treeview-menu">
                    <li><a href="{{url('sales/create')}}"><i class="fa fa-circle-o"></i> Add New Sale</a></li>
                    <li><a href="{{url('sales')}}"><i class="fa fa-circle-o"></i> Sales List</a></li>
                    <li><a href="{{url('sales/sales_values')}}"><i class="fa fa-circle-o"></i> Sales Values List</a></li>
                    <li class="treeview">
                        <a href="#"><i class="fa fa-circle-o"></i> Return & Free Cards
                            <span class="pull-right-container"><i class="fa fa-angle-left pull-right"></i></span>
                        </a>
                        <ul class="treeview-menu">
                            <li class="treeview">
                                <a href="#"><i class="fa fa-circle-o"></i> Return Cards
                                    <span class="pull-right-container"><i class="fa fa-angle-left pull-right"></i></span>
                                </a>
                                <ul class="treeview-menu">
                                    <li><a href="{{ url('sales/get_salable_cards') }}"><i class="fa fa-circle-o"></i> Saleable Cards</a></li>
                                    <li><a href="{{ url('sales/get_non_salable_cards') }}"><i class="fa fa-circle-o"></i> Non Saleable Cards</a></li>
                                </ul>
                            </li>
                            <li><a href="{{ url('sales/get_free_cards') }}"><i class="fa fa-circle-o"></i> Free Cards</a></li>
                        </ul>
                    </li>
                </ul>
            </li>
            <li class="treeview">
                <a href="#"><i class="fa fa-cubes"></i> <span>Stocks</span>
                    <span class="pull-right-container"><i class="fa fa-angle-left pull-right"></i></span>
                </a>

                <ul class="treeview-menu">

                    <li class="treeview">
                        <a href="#"><i class="fa fa-circle-o"></i> In Inventory
                            <span class="pull-right-container"><i class="fa fa-angle-left pull-right"></i></span>
                        </a>
                        <ul class="treeview-menu">
                            <li><a href="{{ url('stocks') }}"><i class="fa fa-circle-o"></i> Stock List</a></li>
                            <li><a href="{{ url('stocks/create') }}"><i class="fa fa-circle-o"></i> Add New Stock</a></li>
                        </ul>
                    </li>
                    <li class="treeview">
                        <a href="#"><i class="fa fa-circle-o"></i> In Trade
                            <span class="pull-right-container">
                  <i class="fa fa-angle-left pull-right"></i>
                </span>
                        </a>
                        <ul class="treeview-menu">
                            <li><a href="{{ url('employees_stocks') }}"><i class="fa fa-circle-o"></i> Stocks In Hand</a></li>
                            <li><a href="{{ url('employees_stocks/issued_log') }}"><i class="fa fa-circle-o"></i> Issued List</a></li>
                            <li><a href="{{ url('employees_stocks/create') }}"><i class="fa fa-circle-o"></i> Issue Stock</a></li>
                        </ul>
                    </li>
                </ul>
            </li>
            <li class="header">Primary Data</li>
            <li class="treeview">
                <a href="#"><i class="fa fa-cube"></i> <span>Products</span>
                    <span class="pull-right-container">
                <i class="fa fa-angle-left pull-right"></i>
              </span>
                </a>
                <ul class="treeview-menu">
                    <li><a href="{{ url('products') }}"><i class="fa fa-circle-o"></i> Product List</a></li>
                    <li><a href="{{ url('products/create') }}"><i class="fa fa-circle-o"></i> Add New Product</a></li>
                </ul>
            </li>
            <li class="treeview">
                <a href="#"><i class="fa fa-users"></i> <span>Employees</span>
                    <span class="pull-right-container">
                <i class="fa fa-angle-left pull-right"></i>
              </span>
                </a>
                <ul class="treeview-menu">
                    <li><a href="{{ url('employees') }}"><i class="fa fa-circle-o"></i> Employee List</a></li>
                    <li><a href="{{ url('employees/create') }}"><i class="fa fa-circle-o"></i> Add New Employee</a></li>
                </ul>
            </li>
            <li class="treeview">
                <a href="#"><i class="fa fa-university"></i> <span>Vendors</span>
                    <span class="pull-right-container">
                <i class="fa fa-angle-left pull-right"></i>
              </span>
                </a>
                <ul class="treeview-menu">
                    <li><a href="{{ url('vendors') }}"><i class="fa fa-circle-o"></i> Vendor List</a></li>
                    <li><a href="{{ url('vendors/create') }}"><i class="fa fa-circle-o"></i> Add New Vendor</a></li>
                </ul>
            </li>
            <li class="header">Reports</li>
            <li class="treeview">
                <a href="#"><i class="fa fa-file-text"></i> <span>Reports</span>
                    <span class="pull-right-container">
                <i class="fa fa-angle-left pull-right"></i>
              </span>
                </a>
                <ul class="treeview-menu">
                    <li><a href="{{url('sales-reports')}}"><i class="fa fa-circle-o"></i> Sales Reports</a></li>
                    <li class="treeview">
                        <a href="#"><i class="fa fa-circle-o"></i> Stocks Reports
                            <span class="pull-right-container"><i class="fa fa-angle-left pull-right"></i></span>
                        </a>
                        <ul class="treeview-menu">
                            <li><a href="{{ url('stocks-in-inventory-reports') }}"><i class="fa fa-circle-o"></i> Inventory</a></li>
                            <li><a href="{{ url('stocks-in-hand-reports') }}"><i class="fa fa-circle-o"></i> Stocks In Trade</a></li>
                        </ul>
                    </li>

                </ul>
            </li>
        </ul>
        <!-- /.sidebar-menu -->
    </section>
    <!-- /.sidebar -->
</aside>
